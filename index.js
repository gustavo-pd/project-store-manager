require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const products = require('./controllers/ProductsController');
const sales = require('./controllers/SalesController');
const productsMiddlewares = require('./middlewares/ProductsMiddleware');
const salesMiddlewares = require('./middlewares/SalesMiddleware');

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
app.post('/sales',
  salesMiddlewares.validProductId,
  salesMiddlewares.validQuantity,
  sales.createNewSale);
app.put('/products/:id',
  productsMiddlewares.validName,
  productsMiddlewares.validQuantity,
  products.editProducts);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});