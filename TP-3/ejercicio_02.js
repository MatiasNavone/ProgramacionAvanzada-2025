function pick(obj, keys) {
  // Creamos un nuevo objeto donde vamos a guardar las propiedades elegidas
  const result = {};

  // Recorremos el array de claves
  for (const key of keys) {
    // Si el objeto original tiene esa propiedad
    if (key in obj) {
      // La agregamos al nuevo objeto con su valor correspondiente
      result[key] = obj[key];
    }
  }

  // Devolvemos el nuevo objeto (sin modificar el original)
  return result;
}

// Ejemplo para probar
console.log(pick({ a: 1, b: 2, c: 3 }, ['a', 'c', 'z'])); // Resultado esperado: { a: 1, c: 3 }
console.log(pick({ name: 'Alice', age: 30, city: 'Wonderland' }, ['name', 'city'])); // Resultado esperado: { name: 'Alice', city: 'Wonderland' }   