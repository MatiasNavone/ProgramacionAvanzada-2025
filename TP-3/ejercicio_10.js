function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    // Creamos un temporizador que rechaza después de ms milisegundos
    const timer = setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);

    // Cuando la promesa original se resuelve o rechaza,
    // limpiamos el timer para evitar que se dispare luego
    promise
      .then(value => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(error => {
        clearTimeout(timer);
        reject(error);
      });
  });
}


// ejemplo
const promesaLenta = new Promise(resolve => setTimeout(() => resolve("OK"), 2000));

withTimeout(promesaLenta, 1000)
  .then(console.log)
  .catch(console.error); // -> Error: Timeout

// ------ B ------ //

function allSettledLite(promises) {
  // Convertimos cada promesa para que siempre se cumpla con un objeto
  const wrappedPromises = promises.map(p =>
    p
      .then(value => ({ status: 'fulfilled', value }))
      .catch(reason => ({ status: 'rejected', reason }))
  );

  // Usamos Promise.all para esperar todas, ya que todas se cumplen ahora
  return Promise.all(wrappedPromises);
}

// ejemplo
const ok = () => Promise.resolve(42);
const fail = () => Promise.reject('error');

allSettledLite([ok(), fail()]).then(console.log);
