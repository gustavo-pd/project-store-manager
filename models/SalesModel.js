const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT sale_id as saleId, date, product_id as productId, quantity 
  FROM StoreManager.sales_products AS sProducts
  INNER JOIN StoreManager.sales AS sales
  ON sProducts.sale_id = sales.id`;
  const sales = await connection.execute(query);
  return sales[0];
};

const findByIdSales = async (id) => {
  const query = `SELECT date, product_id as productId, quantity 
  FROM StoreManager.sales_products
  INNER JOIN StoreManager.sales
  ON sales_products.sale_id = sales.id
  WHERE sales_products.sale_id = ?
  ORDER BY sale_id, productId`;

  const salesData = await connection.execute(query, [id]);
  const salesDataD = salesData[0];

  if (salesDataD.length === 0) return null;
  return salesDataD;
};

const createNewId = async () => {
  const [sales] = await connection.execute(
    'INSERT INTO StoreManager.sales SET date = ?', [new Date()],
  );
  return sales.insertId;
};

const createNewSale = async (id, sales) => {
  await connection.execute(
    'INSERT INTO sales_products SET sale_id = ?, product_id = ?, quantity = ?',
    [id, sales.productId, sales.quantity],
  );
  return {
    productId: sales.productId,
    quantity: sales.quantity,
  };
};

module.exports = {
  getAllSales,
  findByIdSales,
  createNewId,
  createNewSale,
};