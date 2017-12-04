/**
 * @author Chike Udenze
 * @since 11/23/2017
 *
 */

let express = require("express");
let auth = require("../../../utils/authToken");
let booking = require("./booking");
let dates = require("./dates");
let bookingRouter = express.Router();

bookingRouter.post("/new",auth.checkToken,booking.createItem);
bookingRouter.get("/all", auth.checkToken, booking.getAllItems);
bookingRouter.get("/dates", dates.getDates);

module.exports = bookingRouter;