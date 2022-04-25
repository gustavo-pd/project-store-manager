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

const nameVerification = async (name) => {
  const product = await ProductsModel.nameVerification(name);
  return product;
};

const editProducts = async (id, { name, quantity }) => {
  const product = await ProductsModel.editProducts(id, { name, quantity });
  return product;
};

module.exports = {
  getAllProducts,
  findByIdProducts,
  createNewProduct,
  nameVerification,
  editProducts,
};