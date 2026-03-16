require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./src/routes/auth.routes'));
app.use('/clients', require('./src/routes/clients.routes'));
app.use('/services', require('./src/routes/services.routes'));
app.use('/orders', require('./src/routes/orders.routes'));

app.get('/health', (req,res) => {
  res.json({ status: 'ok', message: 'servidor rodando.'});
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});