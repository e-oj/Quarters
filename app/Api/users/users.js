/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let moduleId = "users/user";

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let User = require("../../models/User").User;
let auth = require("../../../utils/authToken");

exports.getUser = (req, res) => {
  let respond = response.success(res);

  respond(http.OK, "Hello User");
};

exports.createUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let user = new User();
  let props = [
    "alias", "email", "password", "first_name", "last_name", "phone"
  ];

  for(prop of props){
    user[prop] = req.body[prop];
  }

  try{
    user = await user.save();
    let token = await auth.createToken(user);

    respond(http.CREATED, "User Created", {user, token});
  }
  catch(err){
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};
