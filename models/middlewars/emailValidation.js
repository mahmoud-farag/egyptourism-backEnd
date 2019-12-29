
var   validateEmail =(email)=> 
{
    var result = /\S+@\S+\.\S+/;
    return result.test(email);
}


module.exports = {validateEmail}
