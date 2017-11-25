/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let moduleId = "api/item/item";
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let Item = require("../../models/Item").Item;

/**
 * Creates Item and returns success or failure response
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.createItem = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let item = new Item();
  let ownerID = req.user["_id"];

  item["name"] = req.body["name"];
  item["size"] = req.body["size"];
  item["userID"] = ownerID;

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
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.getAllItems = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let ownerID = req.user["_id"];
  try{
    items = await Item.find({"userID": ownerID});

    respond(http.OK,"All Items Found", {items});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }
};

/**
 * returns the item with given _id in request query
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.getOneItem = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res,moduleId);

  let itemID = req.query["id"];
  let ownerID = req.user["_id"];
  try{
    item = await Item.find({"userID": ownerID});
    item = await Item.findOne({"_id": itemID});
    item = item.toObject();
    respond(http.OK,"Item Found", {item});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }
};