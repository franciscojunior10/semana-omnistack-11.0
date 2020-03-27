const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/index');

module.exports = {    
    async store(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        
        const id = generateUniqueId();

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