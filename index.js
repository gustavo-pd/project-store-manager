require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const ProductsModel = require('./models/ProductsModel');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (req, res) => {
  const productList = await ProductsModel.getAllProducts();

  res.status(200).json(productList);
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
