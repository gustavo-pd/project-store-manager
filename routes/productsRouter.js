const express = require('express');

const products = require('../controllers/ProductsController');

const productsMiddlewares = require('../middlewares/ProductsMiddleware');

const productsRouter = express.Router();

productsRouter.get('/', products.getAllProducts);

productsRouter.get('/:id', products.findByIdProducts);

productsRouter.post('',
  productsMiddlewares.validName,
  productsMiddlewares.validQuantity,
  products.createNewProduct);

productsRouter.put('/:id',
  productsMiddlewares.validName,
  productsMiddlewares.validQuantity,
  products.editProducts);

productsRouter.delete('/:id',
  products.deleteProducts);

module.exports = productsRouter;