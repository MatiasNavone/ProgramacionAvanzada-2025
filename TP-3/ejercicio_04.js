function sortByMany(list, specs) {
  // 1. Clonar el array para evitar mutar el original (Criterio cumplido)
  const sortedList = [...list];

  // 2. Definir la función de comparación (comparator) para el método sort()
  sortedList.sort((a, b) => {
    // 3. Iterar sobre cada regla de especificación (spec)
    for (const spec of specs) {
      const { key, dir } = spec;

      // Obtener los valores a comparar
      const valA = a[key];
      const valB = b[key];

      // Determinar el resultado de la comparación de los valores actuales
      let comparison = 0;
      if (valA > valB) {
        comparison = 1; // 'a' es mayor que 'b'
      } else if (valA < valB) {
        comparison = -1; // 'a' es menor que 'b'
      }

      // Si los valores son diferentes, aplicamos la dirección (asc/desc)
      if (comparison !== 0) {
        // Multiplicar por -1 invierte la dirección.
        // Si dir es 'asc', multiplicamos por 1 (no cambia).
        // Si dir es 'desc', multiplicamos por -1 (invierte).
        return dir === 'asc' ? comparison : comparison * -1;
      }

      // Si los valores son iguales (comparison === 0), pasamos a la siguiente regla (spec)
      // del bucle for.
    }

    // 4. Si se han agotado todas las reglas y sigue siendo 0, son iguales.
    return 0;
  });

  return sortedList;
}

// ejemplo de uso:

const users = [
  { firstName: 'Leo', lastName: 'Messi', age: 36 },
  { firstName: 'Cris', lastName: 'Ronaldo', age: 38 },
  { firstName: 'Zinedine', lastName: 'Zidane', age: 51 },
  { firstName: 'Juan', lastName: 'Messi', age: 25 },
];

const specs = [
  { key: 'lastName', dir: 'asc' }, // Primer criterio: Apellido A-Z
  { key: 'age', dir: 'desc' }      // Segundo criterio: Edad Z-A (solo si el apellido es el mismo)
];

const sortedUsers = sortByMany(users, specs);

console.log('Usuarios Ordenados:');
console.table(sortedUsers);