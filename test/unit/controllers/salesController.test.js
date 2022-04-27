const { expect } = require("chai");
const sinon = require('sinon');

const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');

describe('Retorna um array de objetos com todas as vendas registrados', () => {
  const payloadSales = [
    {
      "saleId": 1,
      "date": "2022-04-26T18:26:54.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "saleId": 1,
      "date": "2022-04-26T18:26:54.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2022-04-26T18:26:54.000Z",
      "productId": 3,
      "quantity": 15
    }
  ];

  describe('quando retorna com sucesso', () => {
    const req = {};
    const res = {};

    const before = async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'getAllSales').resolves(payloadSales);

      await SalesController.getAllSales(req, res);
    }

    const after = () => {
      SalesService.getAllSales.restore();
    }

    it('deve receber uma resposta status 200 e resposta json com todos os elementos', async () => {

      await before();

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(payloadSales)).to.be.true;

      after();
    });
  });

  describe('Retorna um objeto contendo uma venda em específico', () => {
    const payloadSale = [{
      "saleId": 2,
      "date": "2022-04-26T18:26:54.000Z",
      "productId": 3,
      "quantity": 15
    }];
  
    const req = {};
    const res = {};
  
    describe('Quando o id for igual de uma venda existente', () => {
      it('Deve mandar uma resposta status 200 e o conteúdo da venda do respectivo id em json', async () => {
  
        req.params = { id: 2 };
  
        res.status = sinon.stub().returns(res);
        
        res.json = sinon.stub();
  
        sinon.stub(SalesService, 'findByIdSales').resolves(payloadSale);
  
        await SalesController.findByIdSales(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(payloadSale)).to.be.true;
  
        SalesService.findByIdSales.restore();
  
      })
    })
  
    describe('Quando não existir o id', () => {
  
  
      it('deve chamar a função res.status com o valor 404 e mensagem Sale not found', async () => {
        req.params = { id: 6 };
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
  
        sinon.stub(SalesService, 'findByIdSales').resolves(undefined);
  
        await SalesController.findByIdSales(req, res);
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
  
        SalesService.findByIdSales.restore();
      })
    })
  })

});

describe('Insere uma nova venda no banco de dados', () => {

  const insertedPayloadSale = [{ id: 4, productId: 2, quantity: 20 }];

  const req = {};
  const res = {};

  describe('quando insere com sucesso', () => {
    it('deve responder com status 201 e o que foi cadastrado em json', async () => {

      req.body = insertedPayloadSale;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'createNewSale').resolves(insertedPayloadSale);

      await SalesController.createNewSale(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(insertedPayloadSale)).to.be.true;

      SalesService.createNewSale.restore();

    })
  })
})

describe('Deleta uma venda em específico', () => {

  const req = {};
  const res = {};

  describe('Quando o id passado nao corresponde a nenhum dos produtos', () => {
    it('Deve responder com o status 404 e a mensagem Product not found', async () => {

      req.params = { id: 12 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(SalesService, 'findByIdSales').resolves(false);
      sinon.stub(SalesService, 'deleteSales').resolves();

      await SalesController.deleteSales(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;

      SalesService.deleteSales.restore();
      SalesService.findByIdSales.restore();

    })
  })

})
