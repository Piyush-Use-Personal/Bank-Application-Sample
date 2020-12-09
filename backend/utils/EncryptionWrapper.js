const crypto = require('crypto');

const cipher_key = 'mypassword'
const cipher_algo = 'aes-128-cbc'
const cipher_type = 'hex';
const cipher_encoding = 'utf8';



function encrypt(text){
    var mykey = crypto.createCipher(cipher_algo, cipher_key);
    var mystr = mykey.update(text, cipher_encoding, cipher_type)
    mystr += mykey.final(cipher_type);
    return mystr
}
function decrypt(text){
    var mykey = crypto.createDecipher(cipher_algo, cipher_key);
    var mystr = mykey.update(text, cipher_type, cipher_encoding)
    mystr += mykey.final(cipher_encoding);
    return mystr;
}


  /// --- Exports
  module.exports = {
    encrypt: encrypt,
    decrypt : decrypt,
  };
  
