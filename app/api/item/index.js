/**
 * @author Chike Udenze
 * @since 11/23/2017
 *
 */

let express = require("express");
let auth = require("../../../utils/authToken");
let item = require("./item");
let itemRouter = express.Router();

itemRouter.post("/new",auth.checkToken,item.createItem);
itemRouter.get("/items/all", auth.checkToken, item.getAllItems);
itemRouter.get("/items/", auth.checkToken, item.getOneItem);

module.exports = itemRouter;