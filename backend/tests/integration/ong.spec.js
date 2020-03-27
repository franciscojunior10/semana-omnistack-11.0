const request = require('supertest');
const app = require('../../src/app');
const conection = require('../../src/database/index');

describe('ONG', () => {
    beforeEach(async () => {
        await conection.migrate.rollback();
        await conection.migrate.latest();
    });

    afterAll(async() => {
        await conection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "PADOQUE",
                email: "jrzika@gmail.com",
                whatsapp: "89999830539",
                city: "Lagoa do Sítio",
                uf: "PI"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})