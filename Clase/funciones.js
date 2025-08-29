//function declaration 
function saludar(nombre){
    console.log ("BIENVENIDO, "+ nombre + "!");
}

saludar("Ernesto");


//function expression
const cliente = function (nommbreCliente) {
    console.log("Mostrando datos del cliente: " + nommbreCliente + "Edad," + edadCliente);
}

cliente("Juan", "25");


function actividad(nombre = 'Walter White', nombreActividad = 'Profesor de quimica'){
    console.log (`El cliente ${nombre} esta realizando la actividad: ${nombreActividad}`)
}

actividad("Ernesto", "programcion en Java")
actividad("Juan", "desarrollo web")
actividad(); //