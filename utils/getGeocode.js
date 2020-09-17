const request = require("request");
const https = require("https");

// WITH REQUEST LIBRARY
// const getGeocode = (address, callback) => {
//   const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmVyb25pa2EtbWFydGlub3ZpY2giLCJhIjoiY2tmNDE4dTM3MDI2YjMwcnZkd2dkMXl1NSJ9.h3wfkPXnmoL2HwP1y0O6AA&limit=1`;
//   request({ url: geocodeUrl, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to location services", undefined);
//     } else if (response.body.features.length === 0) {
//       callback("Unable to find geolocation", undefined);
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].center[1],
//         longitude: response.body.features[0].center[0],
//         location: response.body.features[0].place_name,
//       });
//     }
//   });
// };

// WITH HTTPS MODULE
const getGeocode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmVyb25pa2EtbWFydGlub3ZpY2giLCJhIjoiY2tmNDE4dTM3MDI2YjMwcnZkd2dkMXl1NSJ9.h3wfkPXnmoL2HwP1y0O6AA&limit=1`;
  let data = "";

  const request = https.request(geocodeUrl, (response) => {
    response.on("data", (chunk) => {
      data += chunk.toString();
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    });
    
    response.on("error", (error) => {
      callback("Unable to find geolocation", undefined);
    });
  });
  request.on("error", (error) => {
    callback("Unable to connect to location services", undefined);
  });
  request.end();
};

module.exports = getGeocode;
