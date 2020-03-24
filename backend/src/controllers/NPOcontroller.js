const connection = require('../database/connection.js');
const crypto = require('crypto');
module.exports = {
  
  async Create(request,response){
    const {name, email, whatsapp, city, UF} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');
    await connection('NPO').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      UF
    })
    return response.json({id});
  },

  async NpoList(request,response){
    const NPO = await connection('NPO').select('*');
    return response.json(NPO);
  }
}