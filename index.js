/**
 * @author EmmanuelOlaojo
 * @since 11/22/17
 */

let express = require("express");
let logger = require("morgan");
let bodyParser = require("body-parser");

let config = require("./config");
let ApiRouter = require("./app/Routes");

let app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", ApiRouter);

app.listen(config.PORT);

console.log(`Running on port: ${config.PORT}`);
