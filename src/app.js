const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const express = require("express");
const { hasSubscribers } = require("diagnostics_channel");
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "helo world" });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "Please write a address" });
  } else {
    geocode(req.query.address, (error, response) => {
      if (error) {
        res.send({ error });
      } else {
        forecast(response.latitude, response.longitude, (err, data) => {
          if (err) {
            res.send({ err });
          }
          res.send({ data });
        });
      }
    });
  }
});
app.get("*", (req, res) => {
  res.send("404");
});

app.listen(3000, () => {
  console.log("start web server!");
});
