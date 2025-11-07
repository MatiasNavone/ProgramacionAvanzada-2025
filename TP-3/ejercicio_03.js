function groupBy(list, keyOrFn) {
  // Creamos un objeto vacio donde guardaremos los grupos
  const result = {};

  // Recorremos cada elemento de la lista
  for (const item of list) {
    // Si keyOrFn es una función, la usamos para obtener la clave
    // Si no, asumimos que es el nombre de una propiedad del objeto
    const key = typeof keyOrFn === 'function'
      ? keyOrFn(item)
      : item[keyOrFn];

    // Si todavía no existe ese grupo, lo creamos como array vacio
    if (!result[key]) {
      result[key] = [];
    }

    // Agregamos el elemento al grupo correspondiente
    result[key].push(item);
  }

  // Devolvemos el objeto final con los grupos
  return result;
}

// Ejemplos para probar

// Agrupar por propiedad 't'
console.log(groupBy([{ t: 'a' }, { t: 'b' }, { t: 'a' }], 't'));
// { a: [ {t:'a'}, {t:'a'} ], b: [ {t:'b'} ] }

// Agrupar por función (par o impar)
console.log(groupBy([6, 7, 8, 9], n => n % 2 ? 'impar' : 'par'));
// { par: [6, 8], impar: [7, 9] }
