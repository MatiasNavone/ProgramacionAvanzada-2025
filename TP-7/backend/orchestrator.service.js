const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');

const kafka = new Kafka({
  clientId: 'orchestrator-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'orchestrator-group' });

const buildEnvelope = (type, payload, transactionId, userId) => ({
  id: uuidv4(),
  type,
  version: 1,
  ts: Date.now(),
  transactionId,
  userId,
  payload
});

const emitEvent = async (topic, event) => {
  await producer.send({
    topic,
    messages: [{ key: event.transactionId, value: JSON.stringify(event) }]
  });
  console.log(`📤 [Orchestrator] ${event.type} → Tx: ${event.transactionId}`);
};

const processTransaction = async (message) => {
  const event = JSON.parse(message.value.toString());
  if (event.type !== 'txn.TransactionInitiated') return;

  const { transactionId, userId, payload } = event;
  console.log(`🧩 [Orchestrator] Procesando transacción ${transactionId}`);

  await emitEvent('txn.events', buildEnvelope('txn.FundsReserved', { ok: true, holdId: uuidv4(), amount: payload.amount }, transactionId, userId));

  const risk = Math.random() < 0.8 ? 'LOW' : 'HIGH';
  console.log(`🔍 [Orchestrator] Riesgo detectado: ${risk}`);

  if (risk === 'LOW') {
    await emitEvent('txn.events', buildEnvelope('txn.FraudChecked', { risk: 'LOW' }, transactionId, userId));
    await emitEvent('txn.events', buildEnvelope('txn.Committed', { ledgerTxId: uuidv4() }, transactionId, userId));
    await emitEvent('txn.events', buildEnvelope('txn.Notified', { channels: ['email', 'push'] }, transactionId, userId));
  } else {
    await emitEvent('txn.events', buildEnvelope('txn.FraudChecked', { risk: 'HIGH' }, transactionId, userId));
    await emitEvent('txn.events', buildEnvelope('txn.Reversed', { reason: 'High fraud risk' }, transactionId, userId));
  }
};

const run = async () => {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'txn.commands', fromBeginning: true });

  console.log('🧠 [Orchestrator] Escuchando en txn.commands...');
  await consumer.run({ eachMessage: async ({ message }) => processTransaction(message) });
};

run();
