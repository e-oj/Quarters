/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let express = require("express");

let users = require("./users");

let userRouter = express.Router();

userRouter.route("/")
  .get(users.getUser)
  .post(users.createUser);

module.exports = userRouter;
