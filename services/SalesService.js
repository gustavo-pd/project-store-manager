const SalesModel = require('../models/SalesModel');

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();

  return sales;
};

const findByIdSales = async (id) => {
  const sale = await SalesModel.findByIdSales(id);

  return sale;
};

module.exports = {
  getAllSales,
  findByIdSales,
};