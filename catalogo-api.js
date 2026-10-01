const API_KEY = "afd1cf59b5d2816a369620905e7653e0";
const BASE_URL = "https://api.themoviedb.org/3";
const LANG = "es-ES";

async function getPeliculas(endpoint) {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${LANG}`;
    const respuesta = await fetch(url);

    // fetch no lanza error con un 401 o 500: hay que comprobarlo a mano
    if (!respuesta.ok) {
        throw new Error(`TMDB respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos.results.slice(0, 5);
}

// Crea una etiqueta con clase y texto. textContent no interpreta HTML,
// así que un título raro de la API nunca se ejecuta como código.
function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    el.textContent = texto;
    return el;
}

function pintarPeliculas(peliculas, idContenedor) {
    const contenedor = document.getElementById(idContenedor);

    peliculas.forEach((peli, index) => {
        const articulo = document.createElement("article");
        articulo.className = "pelicula";

        const anio = peli.release_date ? peli.release_date.slice(0, 4) : "Sin fecha";

        articulo.append(
            crear("span", "posicion", index + 1),
            crear("h3", "", peli.title),
            crear("p", "anio", anio),
            crear("p", "nota", peli.vote_average.toFixed(1))
        );

        contenedor.appendChild(articulo);
    });
}

function mostrarError() {
    const aviso = crear("p", "error", "No se han podido cargar las películas. Recarga la página en unos minutos.");
    document.querySelector("main").prepend(aviso);
}

async function cargarCatalogo() {
    try {
        // Las tres peticiones salen a la vez en vez de una detrás de otra
        const [populares, valoradas, estrenos] = await Promise.all([
            getPeliculas("/movie/popular"),
            getPeliculas("/movie/top_rated"),
            getPeliculas("/movie/upcoming")
        ]);

        pintarPeliculas(populares, "populares");
        pintarPeliculas(valoradas, "valoradas");
        pintarPeliculas(estrenos, "estrenos");
    } catch (error) {
        console.error("Error al cargar las películas:", error);
        mostrarError();
    }
}

cargarCatalogo();