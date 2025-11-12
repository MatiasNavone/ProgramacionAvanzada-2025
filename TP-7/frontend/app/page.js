"use client";
import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export default function Home() {
  // Diccionario de Eventos
  const EVENT_DESCRIPTIONS = {
    'txn.FundsReserved': 'Fondos Reservados (Verificación Saldo)',
    'txn.FraudChecked': 'Verificación de Fraude Completada',
    'txn.Committed': 'Transacción Confirmada y Ejecutada',
    'txn.Notified': 'Notificación Enviada al Usuario',
    // eventos por fallo:
    'txn.Failed': 'Transacción Fallida', 
  };
  
  const getEventDescription = (eventType) => EVENT_DESCRIPTIONS[eventType] || eventType;

  // --- Estados del Componente ---
  const [userId, setUserId] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [transactionId, setTransactionId] = useState("");
  const [events, setEvents] = useState([]);

  // --- Conexión WebSocket ---
  const { sendJsonMessage, lastJsonMessage } = useWebSocket("ws://localhost:8080", {
    onOpen: () => console.log("✅ Conectado al WebSocket Gateway"),
    shouldReconnect: () => true, 
  });

  // Captura y guarda los eventos de transacción del WebSocket
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type?.startsWith("txn.")) {
      setEvents((prev) => [...prev, lastJsonMessage]);
    }
  }, [lastJsonMessage]);

  // --- Funciones de Utilidad ---
  const resetFormFields = () => {
    setFromAccount("");
    setToAccount("");
    setAmount("");
  };

  // Desuscribe el cliente del canal de eventos y limpia la UI
  const handleCancel = () => {
    if (transactionId) {
      sendJsonMessage({ type: "unsubscribe", transactionId });
      console.log(`Desuscrito de la transacción ID: ${transactionId}`);
    }
    setTransactionId("");
    setEvents([]);
    resetFormFields();
  };

  // Manejador para iniciar la transacción (Envío HTTP al API Gateway)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !fromAccount || !toAccount || !amount) return alert("Completá todos los campos"); 

    try {
      const res = await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, fromAccount, toAccount, amount, currency }),
      });

      const data = await res.json();

      if (data.transactionId) {
        if (transactionId) handleCancel(); 
        
        setTransactionId(data.transactionId);
        setEvents([]); 
        resetFormFields(); 

        sendJsonMessage({ type: "subscribe", transactionId: data.transactionId });
        console.log(`Subscrito a la transacción ID: ${data.transactionId}`);
      } else {
        alert("Error al iniciar la transacción: " + data.message || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al enviar la transacción:", error);
      alert("No se pudo conectar con el servidor de transacciones.");
    }
  };

  // --- logica de finalizacion ---
  // Revisa si la transacción ha terminado (exito o fallo)
  const isSuccessful = events.some(ev => ev.type === 'txn.Committed');
  const isFailed = events.some(ev => ev.status === 'FAILED');
  const isCompleted = isSuccessful || isFailed;

  return (
    // Estilos 
    <main className="flex min-h-screen flex-col items-center p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 mt-10 text-cyan-400">
        Simulador de Transacciones Bancarias
      </h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-5 bg-gray-800 rounded-lg shadow-xl space-y-3">
        <h2 className="text-lg font-semibold mb-2 text-white">Datos de la Transacción</h2>
        
        <input 
          placeholder="Usuario ID" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
        <input 
          placeholder="Cuenta de Origen" 
          value={fromAccount} 
          onChange={(e) => setFromAccount(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
        <input 
          placeholder="Cuenta de Destino" 
          value={toAccount} 
          onChange={(e) => setToAccount(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
        <input 
          type="number" 
          placeholder="Monto" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          min="0"
        />
        
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
        >
          <option value="USD">USD - Dólares</option>
          <option value="ARS">ARS - Pesos</option>
          <option value="EUR">EUR - Euros</option>
        </select>
        
        <button 
          type="submit"
          className="w-full p-2 mt-3 rounded bg-cyan-600 text-white font-medium hover:bg-cyan-500"
        >
          Iniciar Transacción
        </button>
      </form>

      {/* Panel de Eventos */}
      {transactionId && (
        <div className="w-full max-w-sm mt-6 p-5 bg-gray-800 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-cyan-400">
              Monitoreo de Eventos
            </h2>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs rounded-full bg-red-600 text-white hover:bg-red-500"
            >
              Finalizar Monitoreo
            </button>
          </div>

          <p className="text-gray-400 text-sm mb-3 border-b border-gray-700 pb-1">
            ID: <span className="text-gray-300 font-mono text-xs break-all">{transactionId}</span>
          </p>

          <div className="max-h-60 overflow-y-auto space-y-2 pb-1">
            {events.length === 0 && <p className="text-gray-500 text-center text-sm py-2">Esperando eventos...</p>}
            {events.map((ev, i) => (
              <div key={i} className="bg-gray-700 p-2 rounded flex justify-between items-start text-sm">
                <div>
                  {/* Descripción amigable */}
                  <span className="text-white font-normal break-all">{getEventDescription(ev.type)}</span>
                  {/* Código original del evento */}
                  <span className="text-cyan-300 text-xs ml-2">({ev.type})</span>
                  
                  {ev.status && (
                    <span 
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        ev.status === 'COMPLETED' ? 'bg-green-600 text-green-100' : 
                        ev.status === 'FAILED' ? 'bg-red-600 text-red-100' : 
                        'bg-yellow-600 text-yellow-100'
                      }`}
                    >
                      {ev.status}
                    </span>
                  )}
                </div>
                <span className="text-gray-400 text-xs ml-4 shrink-0">
                  {new Date(ev.ts).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>

          {/* msj de finalizacion */}
          {isCompleted && (
            <div className={`mt-3 p-3 rounded text-center font-bold text-sm ${isSuccessful ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`}>
              {isSuccessful ? '✅ Transacción completada con éxito.' : '❌ Transacción Fallida.'}
            </div>
          )}
        </div>
      )}
    </main>
  );
}