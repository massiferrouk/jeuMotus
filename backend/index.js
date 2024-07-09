require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

const app = express();

// Configurer CORS
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Si vous utilisez des cookies
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

const PORT = process.env.PORT || 5000;

syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error creating database and tables:', err);
});
