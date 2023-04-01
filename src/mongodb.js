const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const id = new ObjectId();

// Database Name
const dbName = "weather-app";

// Use connect method to connect to the server
client.connect();
console.log("Connected successfully to server");
const db = client.db(dbName);
const collection = db.collection("documents");
const deleteResult = collection.deleteMany({});
const insertResult = collection.insertMany([
  { name: "moslem", age: 23, id: id },
  { name: "hanie", age: 22, id: id },
]);
const findItem = collection.findOne({ name: "hanie" });
const updateItem = collection.updateOne(
  { name: "moslemHosseinpour" },
  { $set: { name: "moslem" } }
);

findItem
  .then((response) => {
    console.log(response);
  })
  .catch((error) => console.log("error for find", error))
  .finally(() => client.close());

const callbackFunc = (resolve, reject) => {
  setTimeout(() => {
    resolve(1);
    // reject(2);
  }, 2000);
};
resolve = (num) => {
  console.log(num);
};
console.log(callbackFunc());
