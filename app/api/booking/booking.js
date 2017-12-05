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
exports.createBooking = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let booking = new Booking();
  let ownerID = req.user["_id"];
  let nodeMailer = require("nodemailer");

  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "thestorteam@gmail.com",
      pass: "T3x%a10!"
    }
  });

  let mailOptions = {
    from: "thestorteam@gmail.com",
    to: "thestorteam@gmail.com, chikeudenze@gmail.com, ooolaojo@gmail.com",
    subject: "New Stör Booking!",
    text: "Your Daddy"
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  booking["name"] = req.body["name"];
  booking["size"] = req.body["size"];
  booking["userID"] = ownerID;
  booking["pickup"] = req.body["pickup"];
  booking["delivery"] = req.body["delivery"];
  booking["items"] = req.body.items;

  try{
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

    await pickup.save();
    await delivery.save();

    respond(http.CREATED,"Booking Created", {booking});

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


