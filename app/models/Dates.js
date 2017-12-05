/**
 * @author Akram Meza
 * @since 12/3/17
 */

let mongoose = require("mongoose");

let PickupDateSchema = new mongoose.Schema({
  date: {type: Date, required: true}
  , taken: {type: Boolean, default: false}
});

let DeliveryDateSchema = new mongoose.Schema({
  date: {type: Date, required: true}
  , taken: {type: Boolean, default: false}
});

exports.Pickup = mongoose.model("Pickups", PickupDateSchema);
exports.Delivery = mongoose.model("Deliveries", DeliveryDateSchema);
