const { Kafka } = require('kafkajs');
const { WebSocketServer } = require('ws');

const kafka = new Kafka({
  clientId: 'gateway-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'gateway-group' });
const wss = new WebSocketServer({ port: 8080 });

console.log('🌐 [Gateway] WebSocket activo en ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('🔌 [Gateway] Cliente conectado');

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.type === 'subscribe') {
        ws.interest = data.userId
          ? { type: 'userId', value: data.userId }
          : { type: 'transactionId', value: data.transactionId };
        ws.send(JSON.stringify({ type: 'subscribed', status: 'ok' }));
        console.log(`👂 [Gateway] Cliente suscrito a ${ws.interest.type}: ${ws.interest.value}`);
      }
    } catch {
      console.warn('[Gateway] Mensaje inválido recibido');
    }
  });

  ws.on('close', () => console.log('❌ [Gateway] Cliente desconectado'));
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'txn.events', fromBeginning: true });

  console.log('📡 [Gateway] Escuchando eventos en Kafka...');
  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      wss.clients.forEach(client => {
        if (client.readyState === client.OPEN && client.interest) {
          const match =
            (client.interest.type === 'userId' && client.interest.value === event.userId) ||
            (client.interest.type === 'transactionId' && client.interest.value === event.transactionId);
          if (match) client.send(JSON.stringify(event));
        }
      });
    }
  });
};

run();
