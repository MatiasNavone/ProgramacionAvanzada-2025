// Ejercicio 6
const traficoRed = {
"08:00": 1250, // MB transferidos
"09:00": 1870,
"10:00": 2100,
"11:00": 1950,
"12:00": 1600,
"13:00": 1300,
"14:00": 1700,
"15:00": 2200,
"16:00": 1800,
"17:00": 1500
};

// Calcula el total de MB transferidos
const totalDatos = Object.values(traficoRed).reduce((acum, actual) => acum + actual, 0);

// Encuentra la hora con mayor tráfico
let hsMayorTraf = "";
let maxTraf = 0;

const horaMayorTrafico = Object.keys(traficoRed)
    .reduce((horaMax, hora) => 
    traficoRed[hora] > traficoRed[horaMax] ? hora : horaMax    //Recorremos solo las horas
    );                                                         //

console.log(`Total de datos transferidos: ${totalDatos} MB`);
console.log('Hora con mayor trafico: ', horaMayorTrafico, traficoRed[horaMayorTrafico]);