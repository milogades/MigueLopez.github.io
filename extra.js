const textos = {
    es: {
        "nav-inicio": "INICIO",
        "nav-portafolio": "PORTAFOLIO",
        "nav-curriculum": "CURRICULUM",
        "nav-contacto": "CONTACTO",
        "hero-1": "Soy",
        "hero-2": ", estudiante de Desarrollo de Aplicaciones Web (DAW). Aquí encontrarás mis proyectos y mi formación en",
        "hero-3": "desarrollo web",
        "hero-4": "Explora y no dudes en",
        "hero-btn": "contactarme",
        "hero-5": "para más información.",
        "trabajos": "Estos son algunos de mis proyectos",
        "filtro-todos": "Todos",
        "proyecto-1": "proyecto encontrado",
        "proyecto-n": "proyectos encontrados",
        "cv-titulo": "Curriculum",
        "cv-texto": "Soy Miguel, desarrollador web en formación con base en telecomunicaciones. Apasionado por el código, el aprendizaje y la constancia.",
        "contacto-titulo": "Contacto",
        "ph-nombre": "Nombre",
        "ph-apellidos": "Apellidos",
        "ph-email": "Email",
        "ph-telefono": "Teléfono",
        "ph-motivo": "Motivo de contacto",
        "enviar": "Enviar",
        "redes": "Sígueme en redes",
        "info": "Información de contacto",
        "idioma": "ES",
        "cambiar-idioma": "Cambiar idioma a inglés",
        "tema-oscuro": "Activar modo oscuro",
        "tema-claro": "Activar modo claro"
    },
    en: {
        "nav-inicio": "HOME",
        "nav-portafolio": "PORTFOLIO",
        "nav-curriculum": "RESUME",
        "nav-contacto": "CONTACT",
        "hero-1": "I'm",
        "hero-2": ", a Web Application Development (DAW) student. Here you'll find my projects and my training in",
        "hero-3": "web development",
        "hero-4": "Have a look around and feel free to",
        "hero-btn": "contact me",
        "hero-5": "for more information.",
        "trabajos": "Some of my projects",
        "filtro-todos": "All",
        "proyecto-1": "project found",
        "proyecto-n": "projects found",
        "cv-titulo": "Resume",
        "cv-texto": "I'm Miguel, a web developer in training with a background in telecommunications. Passionate about code, learning and consistency.",
        "contacto-titulo": "Contact",
        "ph-nombre": "First name",
        "ph-apellidos": "Last name",
        "ph-email": "Email",
        "ph-telefono": "Phone",
        "ph-motivo": "Message",
        "enviar": "Send",
        "redes": "Follow me",
        "info": "Contact details",
        "idioma": "EN",
        "cambiar-idioma": "Switch language to Spanish",
        "tema-oscuro": "Turn on dark mode",
        "tema-claro": "Turn on light mode"
    }
};

function idiomaActual() {
    return localStorage.getItem("idioma") || "es";
}

function aplicarTema() {
    const oscuro = localStorage.getItem("tema") === "oscuro";
    const t = textos[idiomaActual()];
    document.documentElement.classList.toggle("oscuro", oscuro);

    const boton = document.getElementById("btn-tema");
    if (boton) {
        boton.textContent = oscuro ? "☀" : "☾";
        boton.setAttribute("aria-label", oscuro ? t["tema-claro"] : t["tema-oscuro"]);
    }
}

// Cuenta las tarjetas visibles y escribe el texto en el idioma actual.
// Lo usan filtros.js (al pulsar un filtro) y aplicarIdioma (al cambiar idioma).
function actualizarContador() {
    const contador = document.querySelector(".contador");
    if (!contador) return;

    const tarjetas = document.querySelectorAll(".tarjeta-link");
    let visibles = 0;
    tarjetas.forEach((tarjeta) => {
        if (tarjeta.style.display !== "none") visibles++;
    });

    const t = textos[idiomaActual()];
    const texto = visibles === 1 ? t["proyecto-1"] : t["proyecto-n"];
    contador.textContent = visibles + " " + texto;
}

function aplicarIdioma() {
    const idioma = idiomaActual();
    const t = textos[idioma];

    document.documentElement.lang = idioma;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const clave = el.dataset.i18n;
        if (t[clave]) el.textContent = t[clave];
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
        const clave = el.dataset.i18nPh;
        if (t[clave]) el.placeholder = t[clave];
    });

    const boton = document.getElementById("btn-idioma");
    if (boton) {
        boton.textContent = t.idioma;
        boton.setAttribute("aria-label", t["cambiar-idioma"]);
    }

    aplicarTema();
    actualizarContador();
}

document.getElementById("btn-tema")?.addEventListener("click", () => {
    const oscuro = localStorage.getItem("tema") === "oscuro";
    localStorage.setItem("tema", oscuro ? "claro" : "oscuro");
    aplicarTema();
});

document.getElementById("btn-idioma")?.addEventListener("click", () => {
    const idioma = idiomaActual() === "en" ? "es" : "en";
    localStorage.setItem("idioma", idioma);
    aplicarIdioma();
});

aplicarIdioma();
