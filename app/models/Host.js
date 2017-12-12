/**
 * @author Chike Udenze
 * @since 12/3/17
 */

let mongoose = require("mongoose");
const ERR_REQUIRED = `{PATH} is required`;


let Schema = new mongoose.Schema({
  first_name: {type: String, required: ERR_REQUIRED}
  , last_name: {type:String,required:ERR_REQUIRED}
  , linkedIn: {type: String}
  , profile_img: {
    data: {type: String, required: ERR_REQUIRED},
    mimetype: {type: String, required: ERR_REQUIRED},
  }
  , storage_img: {
    data: {type: String, required: ERR_REQUIRED},
    mimetype: {type: String, required: ERR_REQUIRED}
  }
});

exports.Host = mongoose.model("Hosts", Schema);