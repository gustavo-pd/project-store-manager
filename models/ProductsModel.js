const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
      'SELECT * FROM StoreManager.sales_products;',
  );
  return products;
};

module.exports = {
  getAllProducts,
};