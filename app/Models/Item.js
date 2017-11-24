/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let mongoose = require("mongoose");
const ERR_REQUIRED = `{PATH} is required`;

let Schema = new mongoose.Schema({
  name: {type: String, required: ERR_REQUIRED}
  ,size: {type:String, required: ERR_REQUIRED}
  ,user: {type: Schema.Types.ObjectId, ref: 'User', required:ERR_REQUIRED}
    }

);
exports.Item = mongoose.model("Item", Schema);