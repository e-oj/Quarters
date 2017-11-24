/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let validator = require("validator");

const REQUIRED = "{PATH} is required";

let Schema = mongoose.Schema({
  alias: {type: String, unique: true, required: REQUIRED}
  , email: {
    type: String
    , required: REQUIRED
    , unique: true
    , validate: {
      validator: val => validator.isEmail(val)
      , message: "Invalid Email {VALUE}"
    }
  }
  , password: {type: String, required: REQUIRED, select: false}
  , first_name: {type: String, required: REQUIRED}
  , last_name: {type: String, required: REQUIRED}
  , phone: {
    type: String
    , required: REQUIRED
    , validate: {
      validator: val => validator.isMobilePhone(val, "en-US")
      , message: "Invalid Phone Number"
    }
  }
  , address: {type: String, required: REQUIRED}
});

Schema.pre("save", async function(next){
  let doc = this;

  if(doc.isModified("password")){
    let rounds = 10;

    try{
      doc.password = await bcrypt.hash(doc.password, rounds);
    }
    catch(err){
      return next(err);
    }
  }

  next();
});

exports.User = mongoose.model("Users", Schema);
