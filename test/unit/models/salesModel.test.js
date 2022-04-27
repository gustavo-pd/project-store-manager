const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');

describe('Retorna um array de objetos com todos as vendas registrados', () => {

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

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => {
    connection.execute.restore();
  });
      
  describe('quando retorna com sucesso', () => {

    it('retorna um array de objetos', async () => {
      const response = await SalesModel.getAllSales();

      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
    });

    it('tal objeto possui as propriedades saleId, date, productId e quantity', async () => {
      const [response] = await SalesModel.getAllSales();

      expect(response).to.have.a.property('saleId');
      expect(response).to.have.a.property('date');
      expect(response).to.have.a.property('productId');
      expect(response).to.have.a.property('quantity');
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

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => {
    connection.execute.restore();
  });
      
  describe('quando retorna com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await SalesModel.findByIdSales(id);

      expect(response[0]).to.be.a('object');
    });

    it('tal objeto possui as propriedades saleId, date, productId e quantity', async () => {
      const [response] = await SalesModel.getAllSales();

      expect(response).to.have.a.property('saleId');
      expect(response).to.have.a.property('date');
      expect(response).to.have.a.property('productId');
      expect(response).to.have.a.property('quantity');
    });
  });
  
});

describe('Insere uma nova venda no banco de dados', () => {
  const id = 1;
  const insertedPayloadSale = [{ productId: 2, quantity: 20 }];

  beforeEach(() => {
    const execute = [{ insertId: 1 }]; // retorno esperado nesse teste

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => {
    connection.execute.restore();
  });
      
  describe('quando insere com sucesso', () => {

    it('retorna um objetos', async () => {
      const response = await SalesModel.createNewSale(id, insertedPayloadSale);
      expect([response][0]).to.be.a('object');
    });

    it('o objeto é estritamente igual ao payload', async () => {
      const response = await SalesModel.createNewSale(id, insertedPayloadSale[0]);

      expect([response][0]).to.deep.eq(insertedPayloadSale[0]);
    });
    
  });
  
});

describe('Edita uma venda no banco de dados', () => {

  const payloadSale = { productId: 2, quantity: 20 };
  const insertedPayloadSale = { productId: 2, quantity: 20 };
  const id = 1;

  beforeEach(() => {
    const execute = [{ insertId: 1 }]; // retorno esperado nesse teste

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => {
    connection.execute.restore();
  });
      
  describe('quando edita com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await SalesModel.editSales(id, payloadSale);

      expect(response).to.be.a('object');
    });

    it('o objeto é estritamente igual ao payload', async () => {
      const response = await SalesModel.editSales(id, payloadSale);

      expect(response).to.deep.eq(insertedPayloadSale);
    });
    
  });
  
});

describe('Deleta uma sale em específico', () => {
  const id = 1;

  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  afterEach(() => {
    connection.execute.restore();
  });
      
  describe('quando deleta uma sale não retorna nada', () => {

    it('retorna um objetos', async () => {
      const response = await SalesModel.deleteSales(id);

      expect(response).to.deep.eq(undefined);
    });

  });
  
});

describe('Testa a função getAllSalesId', () => {

  const payloadSales = [
    { id: 1, date: '2022-04-26T18:26:54.000Z' },
    { id: 2, date: '2022-04-26T18:26:54.000Z' },
  ];

  beforeEach(() => {
    const execute = [payloadSales]; // retorno esperado nesse teste

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => {
    connection.execute.restore();
  });
      
  describe('quando retorna com sucesso', () => {

    it('retorna um array de objetos', async () => {
      const response = await SalesModel.getAllSalesId();

      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
    });

    it('tal objeto possui as propriedades id e date', async () => {
      const [response] = await SalesModel.getAllSalesId();

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('date');
    });
  });
  
});