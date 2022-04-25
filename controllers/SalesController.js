const SalesService = require('../services/SalesService');

const getAllSales = async (_req, res) => {
  const salesList = await SalesService.getAllSales();

  res.status(200).json(salesList);
};

const findByIdSales = async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.findByIdSales(parseInt(id, 10));

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

const createNewSale = async (req, res) => {
  const sales = req.body;

  const newSale = await SalesService.createNewSale(sales);

  return res.status(201).json(newSale);
};

const editSales = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const sale = await SalesService.editSales(parseInt(id, 10), sales);

  const findId = await SalesService.findByIdSales(parseInt(id, 10));

  if (!findId) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(sale);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;

  const findId = await SalesService.findByIdSales(id);

  if (!findId) return res.status(404).json({ message: 'Sale not found' });

  await SalesService.deleteSales(id);

  return res.status(204).end();
};

module.exports = {
  getAllSales,
  findByIdSales,
  createNewSale,
  editSales,
  deleteSales,
};