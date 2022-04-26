const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');

describe('Retorna um array de objetos com todos os produtos registrados', () => {

  const payloadProducts = [{ id: 1, name: 'Martelo de Thor', quantity: 10 },
    { id: 2, name: 'Traje de encolhimento', quantity: 20 },
    { id: 3, name: 'Escudo do Capitão América', quantity: 30 }];

  before(async () => {
    const execute = [payloadProducts]; // retorno esperado nesse teste

    sinon.stub(ProductsModel, 'getAllProducts').resolves(execute);
  });

  after(async () => {
    ProductsModel.getAllProducts.restore();
  });
      
  describe('quando retorna com sucesso', () => {

    it('retorna um array de objetos', async () => {
      const response = await ProductsService.getAllProducts();

      expect(response[0]).to.be.a('array');
      expect(response[0][0]).to.be.a('object');
    });

    it('tal objeto possui as propriedades id, name e quantity', async () => {
      const [response] = await ProductsService.getAllProducts();

      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
    });
  });
  
});

describe('Retorna um objeto contendo um produto específico', () => {
  const payloadProduct = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];
  const id = 1;

  before(async () => {
    const execute = [payloadProduct]; // retorno esperado nesse teste

    sinon.stub(ProductsModel, 'findByIdProducts').resolves(execute);
  });

  after(async () => {
    ProductsModel.findByIdProducts.restore();
  });
      
  describe('quando retorna com sucesso', () => {

    it('retorna um array de objetos', async () => {
      const response = await ProductsService.findByIdProducts(id);

      expect(response[0]).to.be.a('array');
      expect(response[0][0]).to.be.a('object');
    });

    it('tal objeto possui as propriedades id, name e quantity', async () => {
      const [response] = await ProductsService.findByIdProducts(id);

      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');
      expect(response[0]).to.have.a.property('quantity');
    });
  });
  
});

// describe('Retorna um objeto contendo um produto específico', () => {

//   const payloadProduct = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];
//   const id = 1;

//   before(async () => {
//     const execute = [payloadProduct]; // retorno esperado nesse teste

//     sinon.stub(connection, 'execute').resolves(execute);
//   });

//   after(async () => {
//     connection.execute.restore();
//   });
      
//   describe('quando retorna com sucesso', () => {

//     it('retorna um objetos', async () => {
//       const response = await ProductsModel.findByIdProducts(id);

//       expect(response).to.be.a('object');
//     });

//     it('tal objeto possui as propriedades id, name e quantity', async () => {
//       const response = await ProductsModel.findByIdProducts(id);

//       expect(response).to.have.a.property('id');
//       expect(response).to.have.a.property('name');
//       expect(response).to.have.a.property('quantity');
//     });
//   });
  
// });

// describe('Insere um novo produto no banco de dados', () => {
//   const insertedPayloadProduct = { id: 1, name: 'Capa do Josias', quantity: 25 };

//   before(async () => {
//     const execute = [{ insertId: 1 }]; // retorno esperado nesse teste

//     sinon.stub(connection, 'execute').resolves(execute);
//   });

//   after(async () => {
//     connection.execute.restore();
//   });
      
//   describe('quando insere com sucesso', () => {

//     it('retorna um objetos', async () => {
//       const response = await ProductsModel.createNewProduct(insertedPayloadProduct.name, insertedPayloadProduct.quantity);

//       expect(response).to.be.a('object');
//     });

//     it('o objeto é estritamente igual ao payload', async () => {
//       const response = await ProductsModel.createNewProduct(insertedPayloadProduct.name, insertedPayloadProduct.quantity);

//       expect(response).to.deep.eq(insertedPayloadProduct);
//     });
    
//   });
  
// });

// describe('Edita um produto no banco de dados', () => {

//   const payloadProduct = { name: 'Capa do Josias', quantity: 25 };
//   const insertedPayloadProduct = { id: 1, name: 'Capa do Josias', quantity: 25 };
//   const id = 1;

//   before(async () => {
//     const execute = [{ insertId: 1 }]; // retorno esperado nesse teste

//     sinon.stub(connection, 'execute').resolves(execute);
//   });

//   after(async () => {
//     connection.execute.restore();
//   });
      
//   describe('quando edita com sucesso', () => {

//     it('retorna um objeto', async () => {
//       const response = await ProductsModel.editProducts(id, payloadProduct);

//       expect(response).to.be.a('object');
//     });

//     it('o objeto é estritamente igual ao payload', async () => {
//       const response = await ProductsModel.editProducts(id, payloadProduct);

//       expect(response).to.deep.eq(insertedPayloadProduct);
//     });
    
//   });
  
// });

// describe('Deleta um produto específico', () => {
//   const id = 1;

//   before(async () => {
//     sinon.stub(connection, 'execute').resolves();
//   });

//   after(async () => {
//     connection.execute.restore();
//   });
      
//   describe('quando deleta um produto não retorna nada', () => {

//     it('retorna um objetos', async () => {
//       const response = await ProductsModel.deleteProducts(id);

//       expect(response).to.deep.eq(undefined);
//     });

//   });
  
// });