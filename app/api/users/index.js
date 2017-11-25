/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let express = require("express");

let users = require("./users");
let auth = require("../../../utils/authToken");

let userRouter = express.Router();

userRouter.route("/")
  .post(users.createUser)
  .put(auth.checkToken, users.editUser)
  .get(auth.checkToken, users.getUser);

module.exports = userRouter;
