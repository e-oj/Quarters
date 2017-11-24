/**
 * @author EmmanuelOlaojo
 * @since 11/22/17
 */

let express = require("express");
let logger = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let bluebird = require("bluebird");

global.Promise = bluebird;

let config = require("./config");

mongoose.Promise = Promise;
mongoose.connect(config.DB_URL, {useMongoClient: true});

let ApiRouter = require("./app/api");

let app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", ApiRouter);

let server = app.listen(config.PORT);

server.on("close", async err => {
  if(err) throw err;

  console.log("\nClosing db connections...\n");
  await mongoose.disconnect();
  console.log("Server Out!! *drops mic*");
});

process.on("SIGINT", server.close);

console.log(`Running on port: ${config.PORT}`);
