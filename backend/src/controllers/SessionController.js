const connection = require('../database/index');

module.exports = {
    async store(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return res.status(400).json({ error: 'Nenhuma ONG encontrada com este ID' });
        }

        return res.json(ong);
    }
}