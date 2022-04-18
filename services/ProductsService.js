const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  return products;
};

const findByIdProducts = async (id) => {
  const product = await ProductsModel.findByIdProducts(id);
  return product;
};

const createNewProduct = async (name, quantity) => {
  const product = await ProductsModel.createNewProduct(name, quantity);

  return product;
};

module.exports = {
  getAllProducts,
  findByIdProducts,
  createNewProduct,
};