const request = require("request");

const forecast = (lat, long, callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=ffe03dcfa06c66648d79c53d9a807d2e&query=${lat},${long}&unit=m`;
  request({ url: forecastUrl, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect server!", undefined);
    } else if (res.body.error) {
      callback("Unable to find your location!", undefined);
    } else {
      callback(
        undefined,
        `Status is ${res.body.current.weather_descriptions[0]}.It is currently ${res.body.current.temperature} deggress out.There is a ${res.body.current.precip} % chance of rain.`
        // res.body.current.weather_descriptions[0]
      );
    }
  });
};

module.exports = forecast;
