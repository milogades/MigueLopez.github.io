# Puerta del Edén · web con reservas

Web de un restaurante con un sistema de reservas propio:

- `index.html` es la web pública. El cliente reserva con nombre, teléfono, personas, fecha, hora y nota.
- `panel.html` es el panel privado del restaurante. Ahí ve las reservas de hoy y las próximas, las confirma o rechaza, llama al cliente o le manda un SMS de confirmación.
- `reservas.js` es la capa de datos. Funciona en **modo demo** (localStorage) o en **modo real** (Supabase).
- `config.js` guarda los datos del restaurante y las claves de Supabase.
- `supabase.sql` crea la tabla y los permisos.
- `privacidad.html` es la política de privacidad (revisarla con el cliente).

## Modo demo (por defecto)

Si `SUPABASE_URL` y `SUPABASE_KEY` están vacíos en `config.js`, las reservas se guardan solo en el navegador del dispositivo.
Sirve para enseñarla: reservas en la web y la reserva aparece en el panel **del mismo móvil**.

## Pasar a modo real (cuando el cliente diga que sí)

1. Crea una cuenta gratis en [supabase.com](https://supabase.com) → **New project** (región: Europa).
2. **SQL Editor → New query**: pega todo `supabase.sql` y pulsa **Run**.
3. **Authentication → Sign In / Providers**: **desactiva "Allow new users to sign up"**.
   ⚠️ Es obligatorio: si no lo haces, cualquiera podría crearse una cuenta y ver las reservas.
4. **Authentication → Users → Add user**: crea el usuario del restaurante (correo + contraseña) y marca "Auto confirm".
5. **Project Settings → API**: copia la **Project URL** y la **Publishable key** (o la *anon key*) en `config.js`.
   Nunca pongas la *secret / service_role key* en la web.
6. Sube los cambios. Prueba una reserva y entra en `panel.html` con el usuario del restaurante.

## Mantenimiento

- **Borrar reservas viejas**, como dice la política de privacidad (más de 3 meses). En el SQL Editor:
  `delete from public.reservas where fecha < current_date - 90;`
  Hazlo una vez al mes o prográmalo con *Database → Cron*.
- **Horas disponibles**: están en el `<select name="hora">` de `index.html`.
- **Otro restaurante**: copia la carpeta, cambia textos, fotos, `config.js` y crea otro proyecto de Supabase.
