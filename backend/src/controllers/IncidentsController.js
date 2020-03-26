const connection =  require('../database/connection');

module.exports = {

    async listAll(request, response) {

        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name as ong_name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(incidents)
     
    },

    async create(request, response) {
    
        const {title, description, value} = request.body;
        const ongId = request.headers.authorization;
    
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id: ongId
        })
    
        return response.json({id});
    },

    async delete(request, response) {

        const {id} = request.params;
        const ongId = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident){
            return response.status(404).json({ error: 'The register does not exists'});
        }    

        if (incident.ong_id !== ongId) {
            return response.status(401).json({ error: 'You have no power here!'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();


    }
};