require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const products = require('./controllers/ProductsController');
const sales = require('./controllers/SalesController');
const productsMiddlewares = require('./middlewares/ProductsMiddleware');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.getAllProducts);
app.get('/sales', sales.getAllSales);
app.get('/products/:id', products.findByIdProducts);
app.get('/sales/:id', sales.findByIdSales);
app.post('/products',
  productsMiddlewares.validName,
  productsMiddlewares.validQuantity,
  products.createNewProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});