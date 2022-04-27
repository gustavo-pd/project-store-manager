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
});

// describe('Deleta uma sale em específico', () => {
//   const id = 2;
//   const quantity = 15;
//   const saleId = [
//     { id: 1, date: new Date() },
//     { id: 2, date: new Date() },
//   ]
//   const allSales = [
//     {
//       saleId: 1,
//       date: new Date(),
//       productId: 1,
//       quantity: 5
//     },
//     {
//       saleId: 1,
//       date: new Date(),
//       productId: 2,
//       quantity: 10
//     },
//     {
//       saleId: 2,
//       date: new Date(),
//       productId: 3,
//       quantity: 15
//     }
//   ]

//   beforeEach(() => {
//     sinon.stub(SalesModel, 'getAllSalesId').resolves(saleId);
//     sinon.stub(SalesModel, 'getAllSales').resolves(allSales);
//     sinon.stub(SalesService, 'updateQuantities').resolves(undefined);
//     sinon.stub(SalesModel, 'deleteSales').resolves(undefined);
//   });

//   afterEach(() => {
//     SalesModel.getAllSalesId.restore();
//     SalesModel.getAllSales.restore();
//     SalesService.updateQuantities.restore();
//     SalesModel.deleteSales.restore();
//   });

//   describe('quando deleta com sucesso', () => {
//     it('retorna undefined', async () => {
//       const response = await SalesService.deleteSales(id);

//       expect(response).to.deep.equal(undefined);
//     });

//   });  
// });

// describe('Insere uma nova venda no banco de dados', () => {
//     const insertedPayloadSale = [{ productId: 2, quantity: 20 }];
//     const id = 2;
//     const expectResult = {
//       id,
//       itemsSold: insertedPayloadSale,
//     }
  
//     beforeEach(() => {
//       sinon.stub(SalesModel, 'createNewId').resolves(id);
//       sinon.stub(SalesModel, 'createNewSale').resolves();
//       sinon.stub(SalesService, 'updateQuantities').resolves();
//     });
  
//     afterEach(() => {
//       SalesModel.createNewSale.restore();
//       SalesModel.createNewId.restore();
//       SalesService.updateQuantities.restore();
//     });
        
//     describe('quando insere com sucesso', () => {
//       it('o objeto é estritamente igual ao payload', async () => {
//         const response = await SalesService.createNewSale(insertedPayloadSale);
  
//         expect(response).to.be.a('object')
//         expect(response).to.deep.eq(expectResult);
//       });
//     });

// });
  

