// Configuración del restaurante y de la base de datos.
// Mientras SUPABASE_URL y SUPABASE_KEY estén vacíos, la web funciona en MODO DEMO:
// las reservas se guardan solo en el navegador de este dispositivo (sirve para enseñarla y grabar el vídeo).
// Para que funcione de verdad, rellena los dos datos de tu proyecto de Supabase (ver README.md).
window.RESERVAS_CONFIG = {
  restaurante: "Puerta del Edén",
  telefono: "856 664 861",

  SUPABASE_URL: "",   // ej.: "https://abcdefgh.supabase.co"
  SUPABASE_KEY: ""    // la clave pública: "Publishable key" (sb_publishable_...) o la antigua "anon key"
};
