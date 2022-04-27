const ProductsModel = require('../models/ProductsModel');

const validProductId = async (req, res, next) => {
  const sales = req.body;

  const findId = sales.every((s) => s.productId);

  if (!findId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validQuantity = async (req, res, next) => {
  const sales = req.body;

  const minQuantity = sales.every((s) => s.quantity < 1);
  const findQuantity = sales.every((s) => s.quantity);
  if (minQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!findQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const validStock = async (req, res, next) => {
  const sales = req.body;

  const products = await ProductsModel.getAllProducts();
  try {
    sales.forEach((sale) => {
      const product = products.find((p) => p.id === sale.productId);
      if (product.quantity < sale.quantity) {
        throw new Error();
      }
    });
  } catch (error) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  next();
};

module.exports = {
  validProductId,
  validQuantity,
  validStock,
};