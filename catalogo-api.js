const API_KEY = "afd1cf59b5d2816a369620905e7653e0";
const BASE_URL = "https://api.themoviedb.org/3";
const LANG = "es-ES";

async function getPeliculas(endpoint) {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${LANG}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.results.slice(0, 5);
}

function pintarPeliculas(peliculas, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    peliculas.forEach((peli, index) => {
        const articulo = document.createElement("article");
        articulo.className = "pelicula";
        articulo.innerHTML = `
            <span class="posicion">${index + 1}</span>
            <h3>${peli.title}</h3>
            <p class="anio">${peli.release_date ? peli.release_date.slice(0, 4) : "Sin fecha"}</p>
            <p class="nota">${peli.vote_average.toFixed(1)}</p>
        `;
        contenedor.appendChild(articulo);
    });
}

async function cargarCatalogo() {
    try {
        const populares = await getPeliculas("/movie/popular");
        const valoradas = await getPeliculas("/movie/top_rated");
        const estrenos = await getPeliculas("/movie/upcoming");
        pintarPeliculas(populares, "populares");
        pintarPeliculas(valoradas, "valoradas");
        pintarPeliculas(estrenos, "estrenos");
    } catch (error) {
        console.error("Error al cargar las películas:", error);
    }
}

cargarCatalogo();
