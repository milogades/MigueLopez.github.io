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
        "contador": "2 proyectos encontrados",
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
        "fct": "Busco prácticas FCT telemáticas para octubre 2026.",
        "idioma": "ES"
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
        "contador": "2 projects found",
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
        "fct": "Looking for remote FCT internship starting October 2026.",
        "idioma": "EN"
    }
};

function aplicarTema() {
    const oscuro = localStorage.getItem("tema") === "oscuro";
    document.documentElement.classList.toggle("oscuro", oscuro);
    const boton = document.getElementById("btn-tema");
    if (boton) boton.textContent = oscuro ? "☀" : "☾";
}

function aplicarIdioma() {
    const idioma = localStorage.getItem("idioma") || "es";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const clave = el.dataset.i18n;
        if (textos[idioma][clave]) el.textContent = textos[idioma][clave];
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
        const clave = el.dataset.i18nPh;
        if (textos[idioma][clave]) el.placeholder = textos[idioma][clave];
    });

    const boton = document.getElementById("btn-idioma");
    if (boton) boton.textContent = textos[idioma].idioma;
}

document.getElementById("btn-tema")?.addEventListener("click", () => {
    const oscuro = localStorage.getItem("tema") === "oscuro";
    localStorage.setItem("tema", oscuro ? "claro" : "oscuro");
    aplicarTema();
});

document.getElementById("btn-idioma")?.addEventListener("click", () => {
    const idioma = localStorage.getItem("idioma") === "en" ? "es" : "en";
    localStorage.setItem("idioma", idioma);
    aplicarIdioma();
});

aplicarTema();
aplicarIdioma();
