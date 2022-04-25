const express = require('express');

const sales = require('../controllers/SalesController');

const salesMiddlewares = require('../middlewares/SalesMiddleware');

const salesRouter = express.Router();

salesRouter.get('/', sales.getAllSales);

salesRouter.get('/:id', sales.findByIdSales);

salesRouter.post('',
  salesMiddlewares.validProductId,
  salesMiddlewares.validQuantity,
  sales.createNewSale);

salesRouter.put('/:id',
  salesMiddlewares.validProductId,
  salesMiddlewares.validQuantity,
  sales.editSales);

salesRouter.delete('/:id',
  sales.deleteSales);

module.exports = salesRouter;