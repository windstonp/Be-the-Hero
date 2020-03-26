const connection = require('../database/connection');
module.exports = {
  async GetProfile(request,response){
    const NGO_id = request.headers.authorization;
    const incidents = await connection('Incidents').select('*').where('NGO_id', NGO_id);
    return response.json(incidents);
  }
} 