const connection = require('../database/connection.js');
const crypto = require('crypto');
module.exports = {
  
  async Create(request,response){
    const {name, email, whatsapp, city, UF} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');
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