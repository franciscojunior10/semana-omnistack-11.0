const connection = require('../database/index');

module.exports = {
    async index(req, res) {
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return res.json(incidents);
    },

    async show(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        
        const incident = await connection('incidents')
            .where('id', id)
            .select('*')
            .first()

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operação não permetida' });
        }
        
        return res.json(incident);
    }
}