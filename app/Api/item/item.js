/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let moduleId = "Api/item/item";
let Item = require("../../Models/Item").Item;
let User = require("../../Models/User").User;
/**
 *Creates Item and returns success or failure response
 *
 * @param req request
 * @param res response
 */
exports.createItem = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let item = new Item();
  let user = req.user;

  item["name"] = req.body["name"];
  item["size"] = req.body["size"];
  item["user"] = req.body["user"];

  try{
      item = await item.save();
      respond(http.CREATED,"Item Created", {item});
  }
  catch(err){
      respondErr(http.BAD_REQUEST,err.message,err);
  }

};
/**
 * returns all items for a given user.
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */
exports.getAllItems = async function(req, res){
    let respond = response.success(res);
    let respondErr = response.failure(res, moduleId);
    let user = req.user;
    try{
        items = await Item.find({"user": user });
        respond(http.OK,"All Items Found", {items});
    }
    catch(err){
        respondErr(http.BAD_REQUEST,err.message,err);
    }
};

/**
 * returns the item with given _id in request query
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */

exports.getOneItem = async function(req, res){
    let respond = response.success(res);
    let respondErr = response.failure(res,moduleId);

    let itemID = req.query["id"];
    let user = req.user;
    try{
        items = await Item.find({"user": user });
        item = await Item.findOne({"_id": itemID});
        item = item.toObject();
        respond(http.OK,"Item Found", {item});
    }
    catch(err){
        respondErr(http.BAD_REQUEST,err.message,err);
    }


};