const request = require("request");

const geocode = (address, callback) => {
  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW9uZmFyZWRtYW4iLCJhIjoiY2xjZDFmNHJuNnN2YjNwa2Vhcnp2cXlqciJ9.DV7XkVC9_B4uHdjkcnolNA`;
  request({ url: geocodingUrl, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect server!", undefined);
    } else if (!res.body.features.length) {
      callback("Unable to find your location!", undefined);
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[0],
        longitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
