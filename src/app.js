const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.port || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup Static directory to serve
app.use(express.static(publicDir));

// Setup handlebars engine and views path
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Pikachu",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Pikachu",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "Some help text",
        title: "Help",
        name: "Pikachu",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Pikachu",
        msg: "Help Article Not Found",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "Your must provide an address",
        });
    } else {
        geocode(req.query.address, (error, data) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            forecast(data.longitude, data.latitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error,
                    });
                }
                res.send({
                    location: data.location,
                    forecast: forecastData,
                    address: req.query.address,
                });
            });
        });
    }
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Pikachu",
        msg: "Page Not Found",
    });
});
app.listen(port, () => {
    console.log("Server is up on port" + port);
});
