

const carrito = ['producto1', 'producto2', 'producto3'];

carrito.map(producto => {
    return `El producto es : ${producto}`;
})

//spread operator

let lenguajes = ['JavaScript', 'Python', 'Java'];
let frameworks = ['React', 'Angular', 'Vue'];

//unir los arrays en 1 solo array
let tecnologias = [ ...lenguajes, ...frameworks];

console.log (tecnologias);

let tecnologias2 = ['C#', 'PHP', 'Ruby'];

//otra forma de unir

let tecnologiasCompletas = lenguajes.concat (frameworks, tecnologias2);

console.log (tecnologiasCompletas);
