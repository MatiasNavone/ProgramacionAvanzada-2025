function deepEqual(a, b) {
  // 1. Caso Base y Casos Primitivos
  if (a === b) {
    return true;
  }

  // 2. Manejo de null y No-Objetos
  if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') {
    return false;
  }

  // 3. Manejo de Arrays
  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);

  if (isArrayA !== isArrayB) {
    // Si uno es array y el otro no, son diferentes.
    return false;
  }

  if (isArrayA && isArrayB) {
    // comparacion 
    if (a.length !== b.length) {
      return false; // Longitudes diferentes
    }
    // Comparar cada elemento 
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // 4. Manejo de Objetos Planos (no-arrays)
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Criterio 1: Mismo conjunto de claves (longitud y contenido)
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Comprobar que todas las claves de A existan en B y que los valores sean iguales
  for (const key of keysA) {
    // Verifica si B tiene la misma clave.
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    // comparacion recursiva de los valores 
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  // 5. Si todas las comprobaciones pasan, los objetos/arrays son iguales
  return true;
}

// Ejemplo 1: Igualdad profunda 
const obj1 = { x: [1, 2], y: { z: 3 } };
const obj2 = { x: [1, 2], y: { z: 3 } };
console.log(`deepEqual({x:[1,2], y:{z:3}}, {x:[1,2], y:{z:3}}) → ${deepEqual(obj1, obj2)}`);

// Ejemplo 2: Diferencia de valor
console.log(`deepEqual({x:1}, {x:'1'}) → ${deepEqual({ x: 1 }, { x: '1' })}`); 
// Ejemplo 3: Diferencia de claves
console.log(`deepEqual({a:1}, {b:1}) → ${deepEqual({ a: 1 }, { b: 1 })}`); 