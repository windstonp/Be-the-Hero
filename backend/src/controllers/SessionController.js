const connection = require('../database/connection');
module.exports={
  async Create(request,response){
    const {id} = request.body;
    const NPO = await connection('NPO').select('name','id').where('id',id).first();
    if (!NPO){
      return response.status(400).json({error: 'Not Found a NPO with this ID'});
    }
    else{
      response.header('authorization',NPO.id);
      return response.json(NPO);
    }
  }
}