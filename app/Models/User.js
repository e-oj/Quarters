/**
 * @author EmmanuelOlaojo
 * @since 11/23/17
 */

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

const ERR_REQUIRED = `{PATH} is required`;

let Schema = new mongoose.Schema({
  alias: {type: String, required: ERR_REQUIRED}
  , email: {type: String, required: ERR_REQUIRED}
  , password: {type: String, required: ERR_REQUIRED}
  , first_name: {type: String, required: ERR_REQUIRED}
  , last_name: {type: String, required: ERR_REQUIRED}
  , phone: {type: String, required: ERR_REQUIRED}
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