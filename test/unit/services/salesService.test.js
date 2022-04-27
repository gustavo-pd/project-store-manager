const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const SalesService = require('../../../services/SalesService');

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

  beforeEach(() => {
    const execute = [payloadSales]; // retorno esperado nesse teste

    sinon.stub(SalesModel, 'getAllSales').resolves(execute);
  });

  afterEach(() => {
    SalesModel.getAllSales.restore();
  });
      
  describe('quando retorna com sucesso', () => {

    it('retorna um array de objetos', async () => {
      const response = await SalesService.getAllSales();
      expect(response[0]).to.be.a('array');
      expect(response[0][0]).to.be.a('object');
    });

    it('tal objeto possui as propriedades saleId, date, productId e quantity', async () => {
      const [response] = await SalesService.getAllSales();

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });
  });
  
});

describe('Retorna um objeto contendo uma venda em específico', () => {
  const payloadSale = [{
    "saleId": 2,
    "date": "2022-04-26T18:26:54.000Z",
    "productId": 3,
    "quantity": 15
  }];
  const id = 2;

  beforeEach(() => {
    const execute = [payloadSale]; // retorno esperado nesse teste

    sinon.stub(SalesModel, 'findByIdSales').resolves(execute);
  });

  afterEach(() => {
    SalesModel.findByIdSales.restore();
  });
      
  describe('quando retorna com sucesso', () => {

    it('retorna um array de objetos', async () => {
      const response = await SalesService.findByIdSales(id);

      expect(response[0]).to.be.a('array');
      expect(response[0][0]).to.be.a('object');
    });

    it('tal objeto possui as propriedades saleId, date, productId e quantity', async () => {
      const [response] = await SalesService.findByIdSales(id);

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');
    });
  });

  describe('Insere uma nova venda no banco de dados', () => {
    const insertedPayloadSale = [{ id: 4, productId: 2, quantity: 20 }];
  
    beforeEach(() => {
  
      sinon.stub(SalesModel, 'createNewSale').resolves(insertedPayloadSale);
    });
  
    afterEach(() => {
      SalesModel.createNewSale.restore();
    });
        
    describe('quando insere com sucesso', () => {
  
      it('retorna um objetos', async () => {
        const response = await SalesService.createNewSale(insertedPayloadSale);
  
        expect(response.itemsSold[0]).to.be.a('object');
      });
  
      it('o objeto é estritamente igual ao payload', async () => {
        const response = await SalesService.createNewSale(insertedPayloadSale);
  
        expect(response.itemsSold[0]).to.deep.eq(insertedPayloadSale[0]);
      });
      
    });
  });
  
});

describe('Deleta uma sale em específico', () => {
  const id = 1;

  beforeEach(() => {

    sinon.stub(SalesModel, 'deleteSales').resolves();
  });

  afterEach(() => {
    SalesModel.deleteSales.restore();
  });

  describe('quando deleta com sucesso', () => {
    it('retorna undefined', async () => {
      const response = await SalesService.deleteSales(id);

      expect(response).to.deep.eq(undefined);
    });

  });  
});