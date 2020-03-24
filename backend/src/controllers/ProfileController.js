const connection = require('../database/connection');
module.exports = {
  async GetProfile(request,response){
    const NPO_id = request.headers.authorization;
    const incidents = await connection('Incidents').select('*').where('NPO_id', NPO_id);
    return response.json(incidents);
  }
} 