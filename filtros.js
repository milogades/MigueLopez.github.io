const botones = document.querySelectorAll(".filtro");
const tarjetas = document.querySelectorAll(".tarjeta-link");
const contador = document.querySelector(".contador");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        botones.forEach((b) => b.classList.remove("activo"));
        boton.classList.add("activo");

        const filtro = boton.dataset.filtro;
        let visibles = 0;

        tarjetas.forEach((tarjeta) => {
            const techs = tarjeta.dataset.tech.split(" ");
            const seVe = filtro === "todos" || techs.includes(filtro);

            tarjeta.style.display = seVe ? "block" : "none";
            if (seVe) {
                visibles++;
            }
        });

        const texto = visibles === 1 ? "proyecto encontrado" : "proyectos encontrados";
        contador.textContent = visibles + " " + texto;
    });
});
