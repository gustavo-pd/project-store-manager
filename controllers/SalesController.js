const SalesService = require('../services/SalesService');

const getAllSales = async (req, res) => {
  const salesList = await SalesService.getAllSales();

  res.status(200).json(salesList);
};

const findByIdSales = async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.findByIdSales(id);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

module.exports = {
  getAllSales,
  findByIdSales,
};