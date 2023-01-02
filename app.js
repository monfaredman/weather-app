const request = require("request");

// const url =
//   "http://api.weatherstack.com/current?access_key=ffe03dcfa06c66648d79c53d9a807d2e&query=New%20York";

// request({ url }, (err, res) => {
//   const data = JSON.parse(res.body);
//   console.log(data.current);
// });

const geocodingUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibW9uZmFyZWRtYW4iLCJhIjoiY2xjZDFmNHJuNnN2YjNwa2Vhcnp2cXlqciJ9.DV7XkVC9_B4uHdjkcnolNA";

request({ url: geocodingUrl, json: true }, (err, res) => {
  const latitude = res.body.features[0].center[0];
  const longitude = res.body.features[0].center[1];
  console.log(latitude, longitude);
});
