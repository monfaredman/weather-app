const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];
if (location) {
  geocode(location, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      forecast(res.latitude, res.longitude, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
    }
  });
} else {
  console.log("Enter address!");
}
