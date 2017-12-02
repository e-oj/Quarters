/* eslint-disable quotes */

let mongoose = require("mongoose");
const ERR_REQUIRED = `{PATH} is required`;


let Schema = new mongoose.Schema({
  first_name: {type: String, required: ERR_REQUIRED}
  , last_name: {type:String,required:ERR_REQUIRED}
  , profile_image: {
    data: {type: String, required: ERR_REQUIRED},
    mimetype: {type: String, required: ERR_REQUIRED},
  }
  , storage_image: {
    data: {type: String, required: ERR_REQUIRED}
  }
});

exports.Host = mongoose.model("Host", Schema);