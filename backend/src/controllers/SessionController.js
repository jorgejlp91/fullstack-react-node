const connection =  require('../database/connection');

module.exports = {

    async create(request, response) {

        const {id} = request.body

        const ongName = await connection('ongs')
            .where('id', id)
            .select('name');

            return response.json(ongName)

    }


}