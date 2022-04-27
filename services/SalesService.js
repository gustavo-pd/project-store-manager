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

const updateQuantities = async (id, quantity) => {
  const product = await ProductsModel.findByIdProducts(id);
  const updatedQuantity = product.quantity - quantity;
  await SalesModel.updateQuantities(id, updatedQuantity);
};

const createNewSale = async (sales) => {
  const createId = await SalesModel.createNewId();
  sales.forEach(async (sale) => {
    await SalesModel.createNewSale(createId, sale);
    await updateQuantities(sale.productId, sale.quantity);
  });
  return {
    id: createId,
    itemsSold: sales,
  };
};

const editSales = async (id, sales) => {  
  sales.forEach(async (sale) => {
    await SalesModel.editSales(id, sale);
    await updateQuantities(sale.productId, sale.quantity);
  });
return {
  saleId: id,
  itemUpdated: sales,
};
};

const deleteSales = async (id) => {
  const allSalesId = await SalesModel.getAllSalesId();
  console.log(allSalesId);
  const findSale = allSalesId.find((s) => s.id === parseInt(id, 10));
  console.log(findSale);
  if (!findSale) {
    return false;
  }
  const sales = await SalesModel.getAllSales();
  const filterSale = sales.filter((q) => q.saleId === parseInt(id, 10));

  filterSale.forEach((p) => { 
    updateQuantities(p.productId, (-p.quantity));
  });
  await SalesModel.deleteSales(id);
};

module.exports = {
  getAllSales,
  findByIdSales,
  createNewSale,
  editSales,
  deleteSales,
  updateQuantities,
};