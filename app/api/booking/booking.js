/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let moduleId = "api/item/item";
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let Host = require("../../models/Host").Host;
let Booking = require("../../models/booking").Booking;
let Pickup = require("../../models/Dates").Pickup;
let Delivery = require("../../models/Dates").Delivery;

/**
 * Creates Booking and returns success or failure response
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.createBooking = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let booking = new Booking();
  let ownerID = req.user["_id"];

  let props = ["size", "pickup", "delivery", "items"];

  for(let prop of props){
    booking[prop] = req.body[prop];
  }

  booking.user = ownerID;

  try{
    let count = await Host.count().exec();
    let rand = Math.floor(Math.random() * count);
    let host = await Host.findOne().skip(rand).exec();

    if(!host){
      return respondErr(http.NOT_FOUND, "No hosts found");
    }

    booking.host = host;

    let pickup = await Pickup.findById(booking.pickup);
    let delivery = await Delivery.findById(booking.delivery);

    if(! (pickup && delivery)){
      return respondErr(http.NOT_FOUND, "Invalid Dates");
    }

    if(pickup.taken) return respondErr(http.CONFLICT, "Pickup time taken");
    if(delivery.taken) return respondErr(http.CONFLICT, "Delivery time taken");

    pickup.taken = true;
    delivery.taken = true;

    booking = await booking.save();

    console.log(booking);

    await pickup.save();
    await delivery.save();

    respond(http.CREATED,"Booking Created", {item: booking});
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
exports.getAllBookings = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let ownerID = req.user["_id"];
  try{
    let bookings = await Booking.find({"userID": ownerID});

    respond(http.OK,"All Items Found", {items: bookings});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }
};
