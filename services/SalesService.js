const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();
  return sales;
};

const findByIdSales = async (id) => {
  const sale = await SalesModel.findByIdSales(id);
  return sale;
};

const updateQuantity = async (id, quantity) => {
  const product = await ProductsModel.findByIdProducts(id);
  const updatedQuantity = product.quantity - quantity;

  await SalesModel.updateQuantity(id, updatedQuantity);
};

const createNewSale = async (sales) => {
  const createId = await SalesModel.createNewId();
  sales.forEach(async (sale) => {
    await SalesModel.createNewSale(createId, sale);
    await updateQuantity(createId, sale.quantity);
  });
  return {
    id: createId,
    itemsSold: sales,
  };
};

const editSales = async (id, sales) => {  
    sales.forEach(async (sale) => {
      await SalesModel.editSales(id, sale);
      await updateQuantity(id, sale.quantity);
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