/* eslint-disable no-undef */

/**
 * @author EmmanuelOlaojo
 * @since 11/22/17
 */

let path = require("path");
let express = require("express");
let logger = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let bluebird = require("bluebird");
let cors = require("cors");

mongoose.Promise = global.Promise = bluebird;

let config = require("./config");
let ApiRouter = require("./app/api");
let dateSetup = require("./date.setup");

mongoose.connect(config.DB_URL, {useMongoClient: true});

const STATIC = path.join(__dirname, "public");
let app = express();

app.use(express.static(STATIC));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api", ApiRouter);

app.use("*", (req, res) => {
  res.sendFile(`${STATIC}/index.html`);
});

dateSetup();

let server = app.listen(config.PORT);

server.on("close", async err => {
  if(err) throw err;

  console.log("\nClosing db connections...\n");
  await mongoose.disconnect();
  console.log("Server Out!! *drops mic*");
});

process.on("SIGINT", () => server.close());

console.log(`Running on port: ${config.PORT}`);
