const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json`;
    const query_params = {
        access_token:
            "pk.eyJ1IjoibHNvbmdvbGl2ZXIiLCJhIjoiY2twMmM5cm11MThlbzJ2cHJ5ZGdtZGVneSJ9.FrW3gHP4Vmz49MD48ev1qQ",
        limit: 1,
    };
    const option = {
        url: url,
        json: true,
        qs: query_params,
    };

    request(option, (error, response, body) => {
        if (error) {
            callback("Unable to connect to location services", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
