const validName = async (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '' || typeof name !== 'string') {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validName,
  validQuantity,
};