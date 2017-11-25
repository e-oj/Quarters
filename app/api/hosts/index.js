/**
 * @author Chike Udenze
 * @since 11/23/2017
 *
 */

let express = require("express");
let auth = require("../../../utils/authToken");
let host = require("./hosts");
let hostRouter = express.Router();

hostRouter.post("/new",auth.checkToken, auth.checkAdmin,host.createHost);
hostRouter.delete("/", auth.checkToken, auth.checkAdmin, host.deleteHost);
hostRouter.put("/", auth.checkToken, auth.checkAdmin, host.editHost);
hostRouter.get("/", auth.checkToken,auth.checkAdmin,host.getHost);

module.exports = hostRouter;