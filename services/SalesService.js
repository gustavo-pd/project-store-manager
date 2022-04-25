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

const editSales = async (id, sales) => {  
  sales.forEach(async (sale) => {
    await SalesModel.editSales(id, sale);
  });
return {
  saleId: id,
  itemUpdated: sales,
};
};

const deleteSales = async (id) => {
  await SalesModel.deleteSales(id);
};

module.exports = {
  getAllSales,
  findByIdSales,
  createNewSale,
  editSales,
  deleteSales,
};