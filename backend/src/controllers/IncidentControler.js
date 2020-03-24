const connection = require('../database/connection');
module.exports = {
  async Create(request,response){
    const {title ,descriptions ,value} = request.body;
    const NPO_id = request.headers.authorization;
    const [id] = await connection('Incidents').insert({
      title,
      descriptions,
      value,
      NPO_id
    });
    return response.json({id});
  },
  async ListIncident (request,response){
    const {page = 1} = request.query;
    const [count] = await connection('Incidents').count();
    const NPO = await connection('Incidents')
    .join('NPO','NPO.id','=','Incidents.NPO_id')
    .limit(5)
    .offset((page-1)*5)
    .select(
      'Incidents.*',
      'NPO.name',
      'NPO.email',
      'NPO.whatsapp',
      'NPO.city',
      'NPO.UF'
    );
    response.header('X-total-count',count['count(*)']);
    return response.json(NPO);
  },
  async DeleteIncident(request,response){
    const {id} = request.params;
    const NPO_id = request.headers.authorization;
    const incident = await connection('Incidents').where('id',id).select('NPO_id').first();
    if(incident.NPO_id != NPO_id){
      return response.status(401).json({error: 'operation not permited' });
    }
    else{
      await connection('Incidents').where('id',id).delete();
      return response.status(204).send();
    }
  }
}