/**
 * @author Chike Udenze
 * @since 11/23/2017
 *
 */

let express = require("express");

let item = require("./item");

let itemRouter = express.Router();

itemRouter.post("/new", item.createItem);
itemRouter.get("/items/all", item.getAllItems);
itemRouter.get("/items/", item.getOneItem);

module.exports = itemRouter;