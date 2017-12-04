/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let moduleId = "index";

let express = require("express");
let apiRouter = express.Router();

let response = require("../../utils/response");
let http = require("../../utils/HttpStats");

let userRouter = require("./users");
let bookingRouter = require("./booking");
let hostRouter = require("./hosts");

apiRouter.use("/u", userRouter);
apiRouter.use("/b", bookingRouter);
apiRouter.use("/h", hostRouter);

apiRouter.get("/", (req, res) => {
  let respond = response.success(res, moduleId);

  respond(http.OK, "Hello World");
});

module.exports = apiRouter;
