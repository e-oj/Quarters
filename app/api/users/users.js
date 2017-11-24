/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let moduleId = "users/user";

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let User = require("../../models/User").User;
let auth = require("../../../utils/authToken");

exports.getUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let _id = req.query.id || req.user._id;

  try{
    let user = await User.findById(_id);

    if(user) return respond(http.OK, "User Found!", {user});
    respond(http.OK, "User Not Found");
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err)
  }
};

exports.createUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let user = new User();
  let props = [
    "alias", "email", "password", "first_name", "last_name", "phone", "address"
  ];

  for(prop of props){
    user[prop] = req.body[prop];
  }

  let noUserExists = ! await User.findOne().exec();

  if(noUserExists){
    user.admin = true;
  }

  try{
    user = await user.save();
    user = user.toObject();
    let token = await auth.createToken(user);

    delete user.password;

    respond(http.CREATED, "User Created", {user, token});
  }
  catch(err){
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};

exports.editUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);

  try{
    let user = req.user;
    let props = [
      "alias", "email", "password", "first_name", "last_name", "phone", "address"
    ];

    for(let prop of props){
      if(req.body[prop]){
        user[prop] = req.body[prop];
      }
    }

    user = await user.save();

    respond(http.OK, "User Edited", {user});
  }
  catch(err){
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};
