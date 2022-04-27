const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT sale_id as saleId, date, product_id as productId, quantity 
  FROM sales_products AS salesProduct
  INNER JOIN sales AS sales
  ON salesProduct.sale_id = sales.id`;
  const sales = await connection.execute(query);
  return sales[0];
};

const getAllSalesId = async () => {
  const query = 'SELECT * FROM sales';
  const sales = await connection.execute(query);
  return sales[0];
};

const findByIdSales = async (id) => {
  const query = `SELECT date, product_id as productId, quantity 
  FROM sales_products
  INNER JOIN sales
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
    'INSERT INTO sales SET date = ?', [new Date()],
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

const editSales = async (id, sales) => {
  await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [sales.quantity, id, sales.productId],
  );
  return {
    productId: sales.productId,
    quantity: sales.quantity,
  };
};

const deleteSales = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

const updateQuantities = async (id, quantity) => {
  await connection
    .execute(
      'UPDATE products SET quantity = ? WHERE id = ?;',
      [quantity, id],
    );
  return {
    productId: id,
    quantity,
  };
};

module.exports = {
  getAllSales,
  getAllSalesId,
  findByIdSales,
  createNewId,
  createNewSale,
  editSales,
  deleteSales,
  updateQuantities,
};