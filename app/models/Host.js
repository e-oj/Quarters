let mongoose = require("mongoose");
const ERR_REQUIRED = `{PATH} is required`;


let Schema = new mongoose.Schema({
  first_name: {type: String, required: ERR_REQUIRED}
  ,last_name: {type:String,required:ERR_REQUIRED}
  ,image:{type:String,required:ERR_REQUIRED}

});

exports.Host = mongoose.model("Host", Schema);