function sumUnique(nums) {
  // Creamos un Set para guardar los numeros
  const uniqueNumbers = new Set();

  // Recorremos cada elemento del array 
  for (const element of nums) {
    // Si el elemento es un número y no es infinito ni NaN
    if (typeof element === 'number' && Number.isFinite(element)) {
      // Lo agregamos al Set (si ya estaba, el Set no lo duplica)
      uniqueNumbers.add(element);
    }
  }

  // Variable para guardar la suma total
  let sum = 0;

  // Recorremos el Set (que solo tiene los números únicos)
  for (const num of uniqueNumbers) {
    // Sumamos cada número al total
    sum += num;
  }

  // Devolvemos la suma final
  return sum;
}

// Ejemplos para probar
console.log(sumUnique([1, 2, 2, 3]));        // 6  (1 + 2 + 3)
console.log(sumUnique([1, '2', 2, 3, 'a'])); // 6  (1 + 2 + 3)
console.log(sumUnique([1, 2, 3, 4, 5]));     // 15 (1 + 2 + 3 + 4 + 5)
console.log(sumUnique([NaN, Infinity, 1, 2])); // 3  (1 + 2)