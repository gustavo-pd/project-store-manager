const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');

describe('Retorna um array de objetos com todos os produtos registrados', () => {

  const payloadProducts = [{ id: 1, name: 'Martelo de Thor', quantity: 10 },
    { id: 2, name: 'Traje de encolhimento', quantity: 20 },
    { id: 3, name: 'Escudo do Capitão América', quantity: 30 }];
      
  describe('quando retorna com sucesso', () => {
    const req = {};
    const res = {};

    const before = async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(ProductsService, 'getAllProducts').resolves(payloadProducts);

      await ProductsController.getAllProducts(req, res);
    }

    const after = () => {
      ProductsService.getAllProducts.restore();
    }

    it('deve receber uma resposta status 200 e resposta json com todos os elementos', async () => {

      await before();

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(payloadProducts)).to.be.true;

      after();
    });
  });

});

describe('Retorna um objeto contendo um produto específico', () => {
  const payloadProduct = [{ id: 1, name: 'Martelo de Thor', quantity: 10 }];

  const req = {};
  const res = {};

  describe('Quando o id for igual de um produto existente', () => {
    it('Deve mandar uma resposta status 200 e o conteúdo do produto do respectivo id em json', async () => {

      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      
      res.json = sinon.stub();

      sinon.stub(ProductsService, 'findByIdProducts').resolves(payloadProduct);

      await ProductsController.findByIdProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(payloadProduct)).to.be.true;

      ProductsService.findByIdProducts.restore();

    })
  })

  describe('Quando não existir o id', () => {


    it('deve chamar a função res.status com o valor 404 e mensagem Product not found', async () => {
      req.params = { id: 6 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(ProductsService, 'findByIdProducts').resolves(undefined);

      await ProductsController.findByIdProducts(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;

      ProductsService.findByIdProducts.restore();
    })
  })
})

describe('Insere um novo produto no banco de dados', () => {

  const insertedPayloadProduct = { id: 1, name: 'Capa do Josias', quantity: 25 };

  const req = {};
  const res = {};

  describe('quando insere com sucesso', () => {
    it('deve responder com status 201 e o que foi cadastrado em json', async () => {

      req.body = insertedPayloadProduct;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(ProductsService, 'createNewProduct').resolves(insertedPayloadProduct);

      await ProductsController.createNewProduct(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(insertedPayloadProduct)).to.be.true;

      ProductsService.createNewProduct.restore();

    })
  })
})

describe('Deleta um produto específico', () => {

  const req = {};
  const res = {};

  describe('Quando o id passado nao corresponde a nenhum dos produtos', () => {
    it('Deve responder com o status 404 e a mensagem Product not found', async () => {

      req.params = { id: 12 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(ProductsService, 'findByIdProducts').resolves(false);
      sinon.stub(ProductsService, 'deleteProducts').resolves();

      await ProductsController.deleteProducts(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;

      ProductsService.deleteProducts.restore();
      ProductsService.findByIdProducts.restore();

    })
  })

  describe('Quando o id corresponde e o produto é deletado:', () => {
    it('Deve responder com status 204', async () => {

      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub();

      sinon.stub(ProductsService, 'findByIdProducts').resolves(true);
      sinon.stub(ProductsService, 'deleteProducts').resolves();

      await ProductsController.deleteProducts(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.called).to.be.true;

      ProductsService.deleteProducts.restore();
      ProductsService.findByIdProducts.restore();

    })
  })
})