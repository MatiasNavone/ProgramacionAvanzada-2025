// Ejercicio 9
const topologiaRed = {
  nodos: [
    { id: "A", tipo: "Router", ubicacion: "Planta 1" },
    { id: "B", tipo: "Switch", ubicacion: "Planta 1" },
    { id: "C", tipo: "Switch", ubicacion: "Planta 2" },
    { id: "D", tipo: "Switch", ubicacion: "Planta 3" },

    { id: "E", tipo: "Router", ubicacion: "Planta 3" },
  ],
  conexiones: [
    { origen: "A", destino: "B", ancho_banda: 1000 },
    { origen: "A", destino: "C", ancho_banda: 1000 },
    { origen: "B", destino: "C", ancho_banda: 100 },
    { origen: "B", destino: "D", ancho_banda: 100 },
    { origen: "C", destino: "D", ancho_banda: 100 },
    { origen: "C", destino: "E", ancho_banda: 1000 },
    { origen: "D", destino: "E", ancho_banda: 1000 },
  ],
};

// Cuenta el número de conexiones por cada nodo
const conexionesPorNodo = {};
topologiaRed.nodos.forEach((nodo) => {
  conexionesPorNodo[nodo.id] = 0; //inicia el contador en 0 para cada nodo
});

topologiaRed.conexiones.forEach((con) => {
  conexionesPorNodo[con.origen] ++; //suma por origen y por destino
  conexionesPorNodo[con.destino] ++; //suma el nodo que recibe le enlace
});

// Encuentra los nodos con más conexiones
const nodosOrdenados = Object.entries(conexionesPorNodo).sort(
  (a, b) => b[1] - a[1]
); // odenamos de mayor a menor la cantidad de conex

// Sugiere optimizaciones (por ejemplo, los nodos con más de 2 conexiones podrían necesitar más ancho de banda)
const sugerencias = [];
for (const [idNodo, cantidad] of nodosOrdenados) {
  if (cantidad > 2) {
    // busca info del nodo
    const infoNodo = topologiaRed.nodos.find((n) => n.id === idNodo);
    sugerencias.push(
      `Nodo ${idNodo} (${infoNodo.tipo} en ${infoNodo.ubicacion}) tiene ${cantidad} conexiones: considerar aumentar ancho de banda o segmentar.`
    );
  }
}

console.log("Conexiones por nodo:", conexionesPorNodo);
console.log("Nodos ordenados por número de conexiones:", nodosOrdenados);
console.log("Sugerencias de optimización:", sugerencias);
