const request = require("request");

const forecast = (longitude, latitude, callback) => {
    url = "http://api.weatherstack.com/current";
    const query_params = {
        access_key: "40e8b6975c3a917170883fc8f3078cd3",
        query: `${latitude},${longitude}`,
    };
    const option = {
        url: url,
        json: true,
        qs: query_params,
    };

    request(option, (error, response, body) => {
        if (error) {
            callback("Unable to connect to weather service");
        } else if (body.error) {
            callback("Unable to find location");
        } else {
            const data = body.current;
            callback(
                undefined,
                `${data.weather_descriptions[0]}. It is currently ${data.temperature} Celcius out. It feels like ${data.feelslike} Celsius`
            );
        }
    });
};

module.exports = forecast;
