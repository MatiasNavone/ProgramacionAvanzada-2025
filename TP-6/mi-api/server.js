const express = require('express');
const { testConnection, sequelize } = require('./config/db');
const usersRoutes = require('./routes/users');
const User = require('./models/User'); // asegura carga del modelo

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRoutes);

const start = async () => {
  await testConnection();
  // sincroniza tablas (similar al código original). alter:true para ajustar columnas.
  await User.sync({ alter: true });
  console.log('✅ Modelos sincronizados');

  app.listen(PORT, () => {
    console.log(`🚀 API escuchando en http://localhost:${PORT}`);
  });
};

start().catch(err => {
  console.error('Error inicializando la app:', err.message || err);
});