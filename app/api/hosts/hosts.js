/**
 * @author Chike Udenze
 * @since 11/23/2017
 */

let moduleId = "api/hosts/hosts";
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let Host = require("../../models/Host").Host;
let Files = require("../../../utils/files");
let fs = Promise.promisifyAll(require("fs"));

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
  let files = req.files;
  let keys = Object.keys(req.files);
  let file;

  host.linkedIn = req.body.linkedIn;
  host.first_name = req.body.first_name;
  host.last_name = req.body.last_name;

  try{
    for (let key of keys){
      file = files[key][0];
      await Files.attachImage(file, host, file.fieldname);
    }

    host = await host.save();
    host.toObject();
    respond(http.CREATED,"Host Created", {host});
  }
  catch(err){
    try{await cleanUp(req);}
    catch (err){console.log(err);}

    respondErr(http.BAD_REQUEST,err.message,err);
  }
};

async function cleanUp(req){
  if(!req.files) return;

  let keys = Object.keys(req.files);
  let file;

  for (let key of keys){
    file = req.files[key][0];

    await fs.unlinkAsync(file.path);
  }
}

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
    let host = await Host.remove({"_id": hostID});
    respond(http.OK,"Host has been deleted", {host});
  }
  catch(err){
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};

/**
 * Gets host with specified ID
 *
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */
exports.getHost = async function(req,res){
  let respond = response.success(res);
  let respondErr = response.failure(res,moduleId);
  let hostID = req.query["_id"];

  try{
    let host = await Host.findOne({"_id": hostID});

    if(!host) return respond(http.OK, "Host not found");

    host = host.toObject();
    respond(http.OK,"Host Found", {host});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }
};

/**
 * Gets all hosts or a number of hosts
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.getHosts = async(req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let limit = req.query["limit"];
  let query;

  limit = isNaN(limit) ? 0 : parseInt(limit);
  query = limit ? Host.find().limit(limit) : Host.find();

  try{
    let hosts = await query.exec();

    respond(http.OK, "Hosts found", {hosts});
  }
  catch(err){
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};

