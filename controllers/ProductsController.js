const ProductsService = require('../services/ProductsService');

const getAllProducts = async (req, res) => {
  const productList = await ProductsService.getAllProducts();

  res.status(200).json(productList);
};

const findByIdProducts = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.findByIdProducts(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  findByIdProducts,
};