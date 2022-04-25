const ProductsService = require('../services/ProductsService');

const getAllProducts = async (_req, res) => {
  const productList = await ProductsService.getAllProducts();
  res.status(200).json(productList);
};

const findByIdProducts = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.findByIdProducts(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

const createNewProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const nameVerification = await ProductsService.nameVerification(name);

  if (nameVerification) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  const newProduct = await ProductsService.createNewProduct(name, quantity);

  return res.status(201).json(newProduct);
};

module.exports = {
  getAllProducts,
  findByIdProducts,
  createNewProduct,
};