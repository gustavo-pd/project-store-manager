const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/ProductsModel');
const ProductsService = require('../../../services/ProductsService');

describe('Retorna um array de objetos com todos os produtos registrados', () => {

  const payloadProducts = [{ id: 1, name: 'Martelo de Thor', quantity: 10 },
    { id: 2, name: 'Traje de encolhimento', quantity: 20 },
    { id: 3, name: 'Escudo do Capitão América', quantity: 30 }];

  beforeAll(() => {
    const execute = [payloadProducts]; // retorno esperado nesse teste

    sinon.stub(ProductsModel, 'getAllProducts').resolves(execute);
  });

  afterAll(() => {
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

  beforeAll(() => {
    const execute = [payloadProduct]; // retorno esperado nesse teste

    sinon.stub(ProductsModel, 'findByIdProducts').resolves(execute);
  });

  afterAll(() => {
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

describe('Insere um novo produto no banco de dados', () => {
  const insertedPayloadProduct = { id: 1, name: 'Capa do Josias', quantity: 25 };

  beforeAll(() => {

    sinon.stub(ProductsModel, 'createNewProduct').resolves(insertedPayloadProduct);
  });

  afterAll(() => {
    ProductsModel.createNewProduct.restore();
  });
      
  describe('quando insere com sucesso', () => {

    it('retorna um objetos', async () => {
      const response = await ProductsService.createNewProduct(insertedPayloadProduct.name, insertedPayloadProduct.quantity);

      expect(response).to.be.a('object');
    });

    it('o objeto é estritamente igual ao payload', async () => {
      const response = await ProductsService.createNewProduct(insertedPayloadProduct.name, insertedPayloadProduct.quantity);

      expect(response).to.deep.eq(insertedPayloadProduct);
    });
    
  });
});

describe('Deleta um produto específico', () => {
  const id = 1;

  beforeAll(() => {

    sinon.stub(ProductsModel, 'deleteProducts').resolves();
  });

  afterAll(() => {
    ProductsModel.deleteProducts.restore();
  });

  describe('quando deleta com sucesso', () => {
    it('retorna undefined', async () => {
      const response = await ProductsService.deleteProducts(id);

      expect(response).to.deep.eq(undefined);
    });

  });  
});