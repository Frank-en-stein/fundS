function makeRandomId(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

function makeRandomInt(mod) {
    return parseInt(Math.random()*1000000000)%mod;
}

export default { makeRandomId, makeRandomInt };