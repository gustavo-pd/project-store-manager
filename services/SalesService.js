const SalesModel = require('../models/SalesModel');

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();
  return sales;
};

const findByIdSales = async (id) => {
  const sale = await SalesModel.findByIdSales(id);
  return sale;
};

const createNewSale = async (sales) => {
  const createId = await SalesModel.createNewId();
  sales.forEach(async (sale) => {
    await SalesModel.createNewSale(createId, sale);
  });
  return {
    id: createId,
    itemsSold: sales,
  };
};

module.exports = {
  getAllSales,
  findByIdSales,
  createNewSale,
};