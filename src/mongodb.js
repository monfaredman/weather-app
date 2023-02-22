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

// deleteResult
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => console.log("error for delete", error))
//   .finally(() => client.close());
// insertResult
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => console.log("error for insert", error))
//   .finally(() => client.close());
findItem
  .then((response) => {
    console.log(response);
  })
  .catch((error) => console.log("error for find", error))
  .finally(() => client.close());
// updateItem
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => console.log("error for update", error))
//   .finally(() => client.close());

// const doWorkCallback = (callback) => {
//   setTimeout(() => {
//     callback("error", undefined);
//   }, 200);
// };
// doWorkCallback((error, result) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log(result);
// });

// const doWorkCallback = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(35);
//     reject("error");
//   }, 200);
// });

// doWorkCallback
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
 
// create a callback function with javascript 
