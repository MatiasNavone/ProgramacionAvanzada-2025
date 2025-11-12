const express = require('express');
const cors = require('cors');
const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');

const kafka = new Kafka({
  clientId: 'api-service',
  brokers: ['localhost:9092']
});
const producer = kafka.producer();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const buildEnvelope = (type, payload, transactionId, userId) => ({
  id: uuidv4(),
  type,
  version: 1,
  ts: Date.now(),
  transactionId,
  userId,
  payload
});

app.post('/transactions', async (req, res) => {
  try {
    const { userId, fromAccount, toAccount, amount, currency } = req.body;
    if (!userId || !fromAccount || !toAccount || !amount || !currency)
      return res.status(400).json({ message: "Faltan datos requeridos." });

    const transactionId = uuidv4();
    const event = buildEnvelope(
      'txn.TransactionInitiated',
      { userId, fromAccount, toAccount, amount, currency },
      transactionId,
      userId
    );

    await producer.send({
      topic: 'txn.commands',
      messages: [{ key: transactionId, value: JSON.stringify(event) }]
    });

    console.log(`💸 [API] Transacción iniciada: ${transactionId} (User: ${userId})`);
    res.status(202).json({ message: "Transacción iniciada", transactionId, status: "PENDING" });
  } catch (err) {
    console.error('[API] ❌ Error al procesar:', err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

const run = async () => {
  await producer.connect();
  app.listen(PORT, () => console.log(`🚀 [API] Escuchando en http://localhost:${PORT}`));
};

run();
