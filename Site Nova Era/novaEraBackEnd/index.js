require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');  // Importe a nova rota de cadastro
const app = express();

app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api', registerRoutes);  // Adicione a rota de cadastro

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
