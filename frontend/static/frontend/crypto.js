function encrypt(message, key){
    let msg = CryptoJS.AES.encrypt(message, key);
    return msg.toString();
  }

  function decrypt(message, key){
      let code = CryptoJS.AES.decrypt(message, key);
      let decryptedMessage = code.toString(CryptoJS.enc.Utf8);
      return decryptedMessage;
  }
