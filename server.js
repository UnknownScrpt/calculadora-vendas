// ──────────────────────────────────────
// Carrega variáveis do .env
require('dotenv').config();

// Dependências
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Sale = require('./models/sale');

// Instância do Express
const app = express();

// Conexão única ao MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/salesDB';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🟢 Conectado ao MongoDB'))
.catch(err => console.error('🔴 Erro ao conectar ao MongoDB:', err));

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Rota de saúde (ping do UptimeRobot)
app.get('/health', (req, res) => res.sendStatus(200));

// Rota para salvar venda
app.post('/save-sale', async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json({ message: 'Venda salva com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar venda.' });
  }
});

// Rota para listar vendas
app.get('/get-sales', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ _id: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar vendas.' });
  }
});

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
