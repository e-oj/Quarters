/**
 * @author Chike Udenze
 * @since 11/23/2017
 *
 */

let express = require("express");
let auth = require("../../../utils/authToken");
let host = require("./hosts");
let hostRouter = express.Router();
let multer  = require("multer");
let upload = multer({ dest: "uploads/" });

let uploads = upload.fields([
  {name: "profile_img", maxCount: 1}
  , {name: "storage_img", maxCount: 1}
]);

let authenticate = [auth.checkToken, auth.checkAdmin];

hostRouter.post("/", authenticate, uploads, host.createHost);
hostRouter.delete("/", authenticate, host.deleteHost);

hostRouter.get("/", host.getHost);
hostRouter.get("/all", host.getHosts);

module.exports = hostRouter;