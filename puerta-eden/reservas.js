// Capa de datos de las reservas.
// - Modo demo: guarda en localStorage (solo en este dispositivo).
// - Modo real: guarda en Supabase (tabla "reservas", ver supabase.sql).
// La web pública solo puede CREAR reservas; el panel (con login) puede verlas y cambiarlas.
(function () {
  const cfg = window.RESERVAS_CONFIG || {};
  const DEMO = !cfg.SUPABASE_URL || !cfg.SUPABASE_KEY;
  const CLAVE_DEMO = "pe_reservas_demo";
  const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/dist/umd/supabase.min.js";

  let cliente = null;

  // Carga la librería de Supabase solo cuando hace falta
  function db() {
    if (cliente) return Promise.resolve(cliente);
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SUPABASE_CDN;
      s.onload = () => {
        cliente = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY);
        resolve(cliente);
      };
      s.onerror = () => reject(new Error("No se pudo cargar la conexión con la base de datos."));
      document.head.appendChild(s);
    });
  }

  // ---------- Modo demo (localStorage) ----------
  function leerDemo() {
    try { return JSON.parse(localStorage.getItem(CLAVE_DEMO)) || []; } catch (e) { return []; }
  }
  function guardarDemo(lista) {
    try { localStorage.setItem(CLAVE_DEMO, JSON.stringify(lista)); } catch (e) { /* almacenamiento bloqueado */ }
  }

  // ---------- Validación común ----------
  function limpiar(r) {
    const tel = String(r.telefono || "").replace(/[^\d+]/g, "");
    const datos = {
      nombre: String(r.nombre || "").trim().slice(0, 80),
      telefono: tel,
      personas: String(r.personas || ""),
      fecha: String(r.fecha || ""),
      hora: String(r.hora || ""),
      nota: String(r.nota || "").trim().slice(0, 500)
    };
    if (datos.nombre.length < 2) throw new Error("Escribe tu nombre.");
    if (!/^\+?\d{9,15}$/.test(datos.telefono)) throw new Error("Escribe un teléfono válido (9 cifras).");
    if (!datos.personas) throw new Error("Elige cuántas personas sois.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha)) throw new Error("Elige una fecha.");
    if (!/^\d{2}:\d{2}$/.test(datos.hora)) throw new Error("Elige una hora.");
    return datos;
  }

  const Reservas = {
    demo: DEMO,

    // Web pública: crea una reserva pendiente
    async crear(r) {
      const datos = limpiar(r);
      if (DEMO) {
        const lista = leerDemo();
        lista.push({ ...datos, id: Date.now().toString(36), creada: new Date().toISOString(), estado: "pendiente" });
        guardarDemo(lista);
        return;
      }
      const c = await db();
      const { error } = await c.from("reservas").insert(datos);
      if (error) throw new Error("No se pudo enviar la reserva. Llámanos al " + cfg.telefono + ".");
    },

    // Panel: lista de reservas desde una fecha (AAAA-MM-DD)
    async listar(desde) {
      if (DEMO) {
        return leerDemo().filter(r => !desde || r.fecha >= desde)
          .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
      }
      const c = await db();
      let q = c.from("reservas").select("*").order("fecha").order("hora");
      if (desde) q = q.gte("fecha", desde);
      const { data, error } = await q;
      if (error) throw new Error("No se pudieron cargar las reservas.");
      return data;
    },

    // Panel: cambia el estado (pendiente / confirmada / rechazada)
    async cambiarEstado(id, estado) {
      if (DEMO) {
        guardarDemo(leerDemo().map(r => r.id === id ? { ...r, estado } : r));
        return;
      }
      const c = await db();
      const { error } = await c.from("reservas").update({ estado }).eq("id", id);
      if (error) throw new Error("No se pudo guardar el cambio.");
    },

    // Panel: sesión del restaurante
    async sesion() {
      if (DEMO) return { demo: true };
      const c = await db();
      const { data } = await c.auth.getSession();
      return data.session;
    },
    async entrar(email, password) {
      const c = await db();
      const { error } = await c.auth.signInWithPassword({ email, password });
      if (error) throw new Error("Correo o contraseña incorrectos.");
    },
    async salir() {
      if (DEMO) return;
      const c = await db();
      await c.auth.signOut();
    },

    // Panel: avisa cuando entra o cambia una reserva
    async escuchar(alCambiar) {
      if (DEMO) {
        window.addEventListener("storage", e => { if (e.key === CLAVE_DEMO) alCambiar(); });
        return;
      }
      const c = await db();
      c.channel("reservas-panel")
        .on("postgres_changes", { event: "*", schema: "public", table: "reservas" }, () => alCambiar())
        .subscribe();
    }
  };

  window.Reservas = Reservas;
})();
