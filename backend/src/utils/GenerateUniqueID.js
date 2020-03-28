const crypto = require('crypto');

module.exports = function GenerateUniqueID() {
  return (crypto.randomBytes(4).toString('HEX')); 
}