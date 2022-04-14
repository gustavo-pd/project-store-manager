const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  return products;
};

const findByIdProducts = async (id) => {
  const product = await ProductsModel.findByIdProducts(id);
  return product;
};

module.exports = {
  getAllProducts,
  findByIdProducts,
};