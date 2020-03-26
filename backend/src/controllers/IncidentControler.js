const connection = require('../database/connection');
module.exports = {
  async Create(request,response){
    const {title ,descriptions ,value} = request.body;
    const NGO_id = request.headers.authorization;
    const [id] = await connection('Incidents').insert({
      title,
      descriptions,
      value,
      NGO_id
    });
    return response.json({id});
  },
  async ListIncident (request,response){
    const {page = 1} = request.query;
    const [count] = await connection('Incidents').count();
    const NGO = await connection('Incidents')
    .join('NGO','NGO.id','=','Incidents.NGO_id')
    .limit(5)
    .offset((page-1)*5)
    .select(
      'Incidents.*',
      'NGO.name',
      'NGO.email',
      'NGO.whatsapp',
      'NGO.city',
      'NGO.UF'
    );
    response.header('X-total-count',count['count(*)']);
    return response.json(NGO);
  },
  async DeleteIncident(request,response){
    const {id} = request.params;
    const NGO_id = request.headers.authorization;
    const incident = await connection('Incidents').where('id',id).select('NGO_id').first();
    if(incident.NGO_id != NGO_id){
      return response.status(401).json({error: 'operation not permited' });
    }
    else{
      await connection('Incidents').where('id',id).delete();
      return response.status(204).send();
    }
  }
}