const botones = document.querySelectorAll(".filtro");
const tarjetas = document.querySelectorAll(".tarjeta-link");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        botones.forEach((b) => b.classList.remove("activo"));
        boton.classList.add("activo");

        const filtro = boton.dataset.filtro;

        tarjetas.forEach((tarjeta) => {
            const techs = tarjeta.dataset.tech.split(" ");
            const seVe = filtro === "todos" || techs.includes(filtro);
            // "" devuelve el display que diga el CSS; "none" la oculta
            tarjeta.style.display = seVe ? "" : "none";
        });

        actualizarContador();
    });
});