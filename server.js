const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Sale = require('./models/sale');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/salesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar no MongoDB:', err));

app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para salvar venda
app.post('/save-sale', async (req, res) => {
    try {
        const sale = new Sale(req.body);
        console.log('Dados recebidos:', req.body);
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

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
