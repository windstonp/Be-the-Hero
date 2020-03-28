const connection = require('../database/connection.js');
const CreateUniqueID = require ('../utils/GenerateUniqueID');
module.exports = {
  
  async Create(request,response){
    const id = CreateUniqueID();
    const {name, email, whatsapp, city, UF} = request.body;
    await connection('NGO').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      UF
    })
    
    return response.json({id});
  },

  async NGOList(request,response){
    const NGO = await connection('NGO').select('*');
    return response.json(NGO);
  }
}