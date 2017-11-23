/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let express = require("express");
let ApiRouter = express.Router();

let response = require("../../utils/response");
let http = require("../../utils/HttpStats");

ApiRouter.get("/", (req, res) => {
  let respond = response.success(res);

  respond(http.OK, "Hello World");
});

module.exports = ApiRouter;
