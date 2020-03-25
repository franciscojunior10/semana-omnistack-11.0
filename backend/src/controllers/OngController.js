const crypto = require('crypto');
const connection = require('../database/index');

module.exports = {    
    async store(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        // cria um id com numeros e string
        const id = crypto.randomBytes(4).toString('HEX');
        // função para criar uma ong
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return res.json({ id });
    },

    async index(req, res) {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    },

};