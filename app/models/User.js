/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let validator = require("validator");

const ERR_REQUIRED = "{PATH} is required";

let Schema = mongoose.Schema({
  alias: {type: String, required: ERR_REQUIRED, unique: true}
  , email: {
    type: String
    , unique: true
    , required: ERR_REQUIRED
    , validate: {
      validator: validator.isEmail
      , message: "Invalid Email {VALUE}"
    }
  }
  , password: {type: String, required: ERR_REQUIRED}
  , first_name: {type: String, required: ERR_REQUIRED}
  , last_name: {type: String, required: ERR_REQUIRED}
  , phone: {
    type: String
    , unique: true
    , required: ERR_REQUIRED
    , validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      }
      , message: "Invalid Phone Number"
    }
  }
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
