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

const subQuantities = async (id, quantity) => {
  const product = await ProductsModel.findByIdProducts(id);
  const updatedQuantity = product.quantity - quantity;
  await SalesModel.updateQuantities(id, updatedQuantity);
};

const addQuantities = async (id, quantity) => {
  const product = await ProductsModel.findByIdProducts(id);
  const updatedQuantity = product.quantity + quantity;
  await SalesModel.updateQuantities(id, updatedQuantity);
};

const createNewSale = async (sales) => {
  const createId = await SalesModel.createNewId();

  await Promise.all(sales.map(async (sale) => SalesModel.createNewSale(createId, sale)));

  await Promise.all(sales.map(async (sale) => SalesModel
    .subQuantities(sale.productId, sale.quantity)));

  return {
    id: createId,
    itemsSold: sales,
  };
};

const editSales = async (id, sales) => {
  const oldSales = await SalesModel.findByIdSales(id);
  console.log(oldSales);
  await Promise.all(oldSales.map(async (sale) => addQuantities(sale.productId, sale.quantity)));

  await Promise.all(sales.map(async (sale) => SalesModel.editSales(id, sale)));

  await Promise.all(sales.map(async (sale) => subQuantities(sale.productId, sale.quantity)));

return {
  saleId: id,
  itemUpdated: sales,
};
};

const deleteSales = async (id) => {
  const allSalesId = await SalesModel.findByIdSales(id);

  await Promise.all(allSalesId.map(async (sale) => addQuantities(sale.productId, sale.quantity)));
  
  // const findSale = allSalesId.find((s) => s.id === parseInt(id, 10));
  // if (!findSale) {
  //   return false;
  // }
  // const sales = await SalesModel.getAllSales();
  // const filterSale = sales.filter((q) => q.saleId === parseInt(id, 10));

  // filterSale.forEach((p) => { 
  //   addQuantities(p.productId, (p.quantity));
  // });
  await SalesModel.deleteSales(id);
};

module.exports = {
  getAllSales,
  findByIdSales,
  createNewSale,
  editSales,
  deleteSales,
};