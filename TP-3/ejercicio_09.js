function debounce(fn, delay) {
  let timer; // guarda el id del setTimeout activo

  // devolvemos una nueva funcion (closure)
  return function(...args) {
    // 'this' puede ser importante, por ejemplo si fn usa 'this'
    const context = this;

    // si ya hay un timer activo, lo cancelamos
    clearTimeout(timer);

    // creamos un nuevo timer
    timer = setTimeout(() => {
      fn.apply(context, args); // ejecuta fn preservando this y los argumentos
    }, delay);
  };
}

// ejemplo 
function buscar(texto) {
  console.log("Buscando:", texto);
}

const buscarDebounced = debounce(buscar, 500);

buscarDebounced("h");
buscarDebounced("ho");
buscarDebounced("hol");
buscarDebounced("hola");
// Solo se ejecutará "buscar" 500ms después de la última llamada a buscarDebounced