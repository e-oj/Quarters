/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let mongoose = require("mongoose");
const ERR_REQUIRED = `{PATH} is required`;
let MongooseSchema = mongoose.Schema;

let Schema = new mongoose.Schema({
  name: {type: String, required: ERR_REQUIRED}
  ,pickup:{type:String,required:ERR_REQUIRED}
  ,delivery:{type:String,required:ERR_REQUIRED}
  ,size: {type:String, required: ERR_REQUIRED}
  ,userID: {type: MongooseSchema.Types.ObjectId, ref: 'Users', required:ERR_REQUIRED}
  ,hostID: {type: MongooseSchema.Types.ObjectId, ref: 'Hosts', required:ERR_REQUIRED}
});

exports.Item = mongoose.model("Item", Schema);