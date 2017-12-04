/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let moduleId = "api/item/item";
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let Booking = require("../../models/booking").Booking;
let {Pickup, Delivery} = require("../../models/Dates");

/**
 * Creates Booking and returns success or failure response
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.createItem = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let item = new Booking();
  let ownerID = req.user["_id"];

  item["name"] = req.body["name"];
  item["size"] = req.body["size"];
  item["userID"] = ownerID;
  item["pickup"] = req.body["pickup"];
  item["delivery"] = req.body["delivery"];

  try{
    let pickup = await Pickup.findById(item.pickup);
    let delivery = await Delivery.findById(item.delivery);

    if(! (pickup && delivery)){
      return respondErr(http.NOT_FOUND, "Invalid Dates");
    }

    if(pickup.taken) return respondErr(http.CONFLICT, "Pickup time taken");
    if(delivery.taken) return respondErr(http.CONFLICT, "Delivery time taken");

    pickup.taken = true;
    delivery.taken = true;

    item = await item.save();

    await pickup.save();
    await delivery.save();

    respond(http.CREATED,"Booking Created", {item});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }
};

/**
 * returns all items for a given user.
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.getAllItems = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let ownerID = req.user["_id"];
  try{
    let items = await Booking.find({"userID": ownerID});

    respond(http.OK,"All Items Found", {items});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }
};
