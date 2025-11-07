function wordFreq(text) {
  // Pasamos todo el texto a minus para ignorar mayus/minus
  const lowerText = text.toLowerCase();

  // Quitamos signos de puntuacion basicos usando expresion regular
  const cleanText = lowerText.replace(/[.,:;!?]/g, '');

  // Separamos las palabras por espacio
  const words = cleanText.split(/\s+/); // \s+ significa "uno o más espacios"

  // Creamos un Map para guardar la frecuencia
  const freqMap = new Map();

  // Recorremos cada palabra
  for (const word of words) {
    if (word === '') continue; // ignorar vacio por si hay espacios dobles

    // Si ya existe en el Map, sumamos 1; si no, la iniciamos en 1
    freqMap.set(word, (freqMap.get(word) || 0) + 1);
  }

  // Devolvemos el Map con las frecuencias
  return freqMap;
}

// Ejemplos
const result = wordFreq("Hola, hola! ¿Chau?");
console.log(result);

const result2 = wordFreq("Hola. Hola, hola; chau: chau!");
console.log(result2);

const result3 = wordFreq("matias, matias. matias! MATIAS?");
console.log(result3);

