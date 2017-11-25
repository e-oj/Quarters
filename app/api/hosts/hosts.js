/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let moduleId = "api/hosts/hosts";
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let Host = require("../../models/Host").Host;

/**
 * Creates host object and stores in database
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */
exports.createHost = async function(req,res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let host = new Host();

  host["first_name"] = req.body["first_name"];
  host["last_name"] = req.body["last_name"];

  try{
    host = await host.save();
    respond(http.CREATED,"Host Created", {host});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }

};
/**
 * Edits host
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */
exports.editHost = async function(req,res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);

  try{
    let hostID = req.query["_id"];
    let props = ["first_name", "last_name"];

    host = await Host.findOne({"_id:": hostID});

    for(let prop of props){
      if(req.body[prop]){
        host[prop] = req.body[prop];
      }
    }
    host = await host.save();

    respond(http.OK, "Host Edited", {host});
  }
  catch(err){
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};

/**
 * Deletes host from database
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */
exports.deleteHost = async function(req,res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let hostID = req.query["_id"];

  try{
    host = await Host.remove({"_id": hostID});
    respond(http.OK,"Host has been deleted", {host});
  }
  catch(err){
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};

/**
 * Gets host with specified ID
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */
exports.getHost = async function(req,res){
  let respond = response.success(res);
  let respondErr = response.failure(res,moduleId);
  let hostID = req.query["_id"];
  try{
    host = await Host.findOne({"_id": hostID});
    host = host.toObject();
    respond(http.OK,"Host Found", {host});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }
};

