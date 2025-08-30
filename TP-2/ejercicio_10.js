// Ejercicio 10

const topologiaRed = {
nodos: [
{ id: "A", tipo: "Router", ubicacion: "Planta 1" },
{ id: "B", tipo: "Switch", ubicacion: "Planta 1" },
{ id: "C", tipo: "Switch", ubicacion: "Planta 2" },
{ id: "D", tipo: "Switch", ubicacion: "Planta 3" },
{ id: "E", tipo: "Router", ubicacion: "Planta 3" }
],
conexiones: [
{ origen: "A", destino: "B", ancho_banda: 1000 },
{ origen: "A", destino: "C", ancho_banda: 1000 },
{ origen: "B", destino: "C", ancho_banda: 100 },
{ origen: "B", destino: "D", ancho_banda: 100 },
{ origen: "C", destino: "D", ancho_banda: 100 },
{ origen: "C", destino: "E", ancho_banda: 1000 },
{ origen: "D", destino: "E", ancho_banda: 1000 }
]
};

// Cuenta el número de conexiones por nodo
const conexionesPorNodo = {};
topologiaRed.nodos.forEach(nodo => {
conexionesPorNodo[nodo.id] = 0;
});

// Tu código aquí para contar las conexiones
topologiaRed.conexiones.forEach(con => {
  conexionesPorNodo[con.origen] ++;  // suma para el nodo de origen
  conexionesPorNodo[con.destino] ++; // suma para el nodo de destino
});

// Encuentra los nodos con más conexiones

const nodosOrdenados = Object.entries(conexionesPorNodo)
.sort((a, b) => b[1] - a[1]);

const sugerencias = nodosOrdenados //Tomamos los nodos con más de 2 conexiones y armamos un mensaje recomendado (más ancho de banda o segmentar).
  .filter(([_, cant]) => cant > 2)
  .map(([id, cant]) => `Nodo ${id} con ${cant} conexiones: considerar subir ancho de banda o segmentar.`);

console.log("Conexiones por nodo:", conexionesPorNodo);
console.log("Nodos ordenados por numero de conexiones:", nodosOrdenados); 
console.log("Sugerencias de optim:", sugerencias);
