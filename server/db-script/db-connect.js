const mongodb = require("mongodb");
require("dotenv").config();
const MongoClient = mongodb.MongoClient;
// eslint-disable-next-line quotes
const uri = process.env.TESTING_URI || `mongodb+srv://${process.env.mongodbUsername}:${process.env.mongodbPassword}@cluster0.cthkj.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;
const dbName = process.env.dbName || "phi-internal";

var db = null;
var db_export = {
  connectToServer: (callback) => {
    MongoClient.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err)
          return callback(
            "Failed to connect to database server: Error Stack below",
            err.errmsg
          );
        db = client.db(dbName);
        callback("Connected successfully to database server", undefined);
      }
    );
  },
  getDB: () => {
    return db;
  },
};

module.exports = db_export;
