const connection = require('../database/index');

module.exports = {
    async store(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;
        
        // cadastrar casos
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return res.json({ id });
    },

    async index(req, res) {
        // trabalhar com paginação
        const { page = 1 } = req.query;
        // contar quantos casos tem
        const [count] = await connection('incidents').count();
        // mostrar os casos de 5 em 5
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset(( page - 1 ) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
        // retornar a para o header a quantidadde de casos
        res.header('X-Total-Count', count['count(*)']);
        
        return res.json(incidents);
    },

    async delete(req, res) {
        const { id } = req.params;
        // pega o ong_id de quem criou o caso
        const ong_id = req.headers.authorization;
        // busca o caso para deletar
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        // verifica se a ong é a mesma que criou o caso
        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operação não permetida' });
        }
        // deleta o caso de acordo com if passo
        await connection('incidents').where('id', id).delete();
        // retorno sem conteudo
        return res.status(204).send();
    },
    
    async update(req, res) {
        const { title, description, value } = req.body;
        const { id } = req.params;
        const ong_id = req.headers.authorization;
        
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
    
        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operação não permetida' });
        }
        // função para realizar o update
        await connection('incidents').where('id', id).update({
            title,
            description,
            value
        });

        return res.json({ ok: 'ok' });
    }

};