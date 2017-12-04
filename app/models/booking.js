/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let mongoose = require("mongoose");
const ERR_REQUIRED = `{PATH} is required`;
let Schema = mongoose.Schema;

let BookingSchema = new Schema({
  name: {type: String, required: ERR_REQUIRED}
  ,pickup: {type: Schema.Types.ObjectId, ref: "Pickups", required: ERR_REQUIRED}
  ,delivery: {type: Schema.Types.ObjectId, ref: "Deliveries", required: ERR_REQUIRED}
  ,size: {type:String, required: ERR_REQUIRED}
  ,userID: {type: Schema.Types.ObjectId, ref: "Users", required: ERR_REQUIRED}
  ,hostID: {type: Schema.Types.ObjectId, ref: "Hosts", required: ERR_REQUIRED}
});

exports.Booking = mongoose.model("Booking", BookingSchema);
