const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const { body } = await request(app).post('/ongs').send({
      name: 'Adocao',
      email: 'oi@adocao.com.br',
      whatsapp: '1499999999',
      city: 'São Paulo',
      uf: 'SP',
    });

    expect(body).toHaveProperty('id');
    expect(body.id).toHaveLength(8);
  });
});
