let dataset = [];

// Cargar dataset y actualizar fechas automaticamente
fetch('dataset.json')
  .then(res => res.json())
  .then(data => {
    dataset = data.map(flight => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
      const returnDate = new Date(startDate);
      returnDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1);

      return {
        ...flight,
        date: startDate.toISOString().split('T')[0],
        returnDate: returnDate.toISOString().split('T')[0]
      };
    });
  })
  .catch(err => console.error(err));

const searchBtn = document.getElementById('searchBtn');
const resultsList = document.getElementById('resultsList');
const priceSlider = document.getElementById('max-price');
const priceValue = document.getElementById('price-value');

// Actualizar valor del slider en tiempo real
priceSlider.addEventListener('input', () => {
  priceValue.textContent = priceSlider.value;
});

searchBtn.addEventListener('click', () => {
  let passengersInput = document.getElementById('passengers').value;
  let passengers = passengersInput ? parseInt(passengersInput) : 1;
  if (passengers < 1) passengers = 1;

  const origin = document.getElementById('origin').value.toLowerCase();
  const destination = document.getElementById('destination').value.toLowerCase();
  const sortOrder = document.getElementById('sortOrder').value;
  const maxPrice = parseInt(priceSlider.value);

  // Filtrar por precio max y disponibilidad
  let filtered = dataset.filter(flight => {
    const availability = Number(flight.availability);
    return flight.price <= maxPrice && availability >= passengers;
  });

  // Filtrar por destino 
  if (destination) {
    filtered = filtered.filter(flight => flight.destination.toLowerCase().includes(destination));
  }

  // Filtrar por origen
  if (origin) {
    filtered = filtered.filter(flight => flight.origin.toLowerCase().includes(origin));
  }

  // Ordenar 
  filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  resultsList.innerHTML = '';
  if (filtered.length === 0) {
    resultsList.innerHTML = '<li>No hay vuelos disponibles para la cantidad de pasajeros seleccionada o tu presupuesto.</li>';
  } else {
    // Calcular precios min y max
    const minPrice = Math.min(...filtered.map(f => f.price));
    const maxPriceFlight = Math.max(...filtered.map(f => f.price));

    filtered.forEach((flight) => {
      const duration = Math.ceil((new Date(flight.returnDate) - new Date(flight.date)) / (1000 * 60 * 60 * 24));
      const li = document.createElement('li');

      // Resaltar vuelos más barato y más caro
      if (flight.price === minPrice) li.classList.add('cheapest');
      if (flight.price === maxPriceFlight) li.classList.add('expensive');

      li.innerHTML = `
        <div>✈️</div>
        <div>
          <div>📍 <span>Origen:</span> ${flight.origin}</div>
          <div>📍 <span>Destino:</span> ${flight.destination}</div>
          <div>💰 <span>Precio por persona:</span> $${flight.price}</div>
          <div>🗓️ <span>Fecha de ida:</span> ${flight.date}</div>
          <div>🗓️ <span>Fecha de regreso:</span> ${flight.returnDate}</div>
          <div>⏳ <span>Duración del viaje:</span> ${duration} días</div>
          <div>🧑‍🤝‍🧑 <span>Disponibilidad:</span> ${flight.availability} pasajeros</div>
        </div>
      `;
      resultsList.appendChild(li);
    });
  }
});
