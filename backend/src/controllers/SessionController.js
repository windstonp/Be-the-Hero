const connection = require('../database/connection');
module.exports={
  async Create(request,response){
    const {id} = request.body;
    const NGO = await connection('NGO').select('name','id').where('id',id).first();
    if (!NGO){
      return response.status(400).json({error: 'Not Found a NGO with this ID'});
    }
    else{
      response.header('authorization',NGO.id);
      return response.json(NGO);
    }
  }
}