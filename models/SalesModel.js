const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT sale_id as saleId, date, product_id as productId, quantity 
  FROM sales_products AS sProducts
  INNER JOIN sales AS sales
  ON sProducts.sale_id = sales.id`;
  const [products] = await connection.execute(query);
  return products;
};

const findByIdSales = async (id) => {
  const query = `SELECT date, product_id as productId, quantity 
  FROM sales_products
  INNER JOIN sales
  ON sales_products.sale_id = sales.id
  WHERE sales_products.sale_id = ?
  ORDER BY sale_id, productId`;

  const [salesData] = await connection.execute(query, [id]);

  if (salesData.length === 0) return null;

  return salesData[0];
};

module.exports = {
  getAllSales,
  findByIdSales,
};