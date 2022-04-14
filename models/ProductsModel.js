const connection = require('./connection');

const getAllProducts = async () => {
  const products = await connection.execute(
      'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return products[0];
};

const findByIdProducts = async (id) => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE id = ? ORDER BY id';

  const productsData = await connection.execute(query, [id]);
  if (productsData.length === 0) return null;
  
  return productsData[0][0];
};

module.exports = {
  getAllProducts,
  findByIdProducts,
};