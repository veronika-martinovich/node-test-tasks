//const request = require("request");
const https = require("https");

// WITH REQUEST LIBRARY
// const getWeather = (lat, lon, callback) => {
//   const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0870153e00bece09ca5362f2a4484ea`;
//   request({ url: weatherUrl, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect weather api", undefined);
//     } else if (response.body.message) {
//       callback("Unable to find location", undefined);
//     } else {
//       callback(
//         undefined,
//         `${response.body.weather[0].main}. It is currently ${response.body.main.temp} degrees out. It feels like ${response.body.main.feels_like} degrees out.`
//       );
//     }
//   });
// };

// WITH HTTPS MODULE
const getWeather = (lat, lon, callback) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0870153e00bece09ca5362f2a4484ea`;
  let data = "";

  const request = https.request(weatherUrl, (response) => {
    response.on("data", (chunk) => {
      data += chunk.toString();
    });

    response.on("error", (error) => {
      callback("Unable to find location", undefined);
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      callback(
        undefined,
        `${body.weather[0].main}. It is currently ${body.main.temp} degrees out. It feels like ${body.main.feels_like} degrees out.`
      );
    });
  });
  request.on("error", (error) => {
    callback("Unable to connect weather api", undefined);
  });
  request.end();
};

module.exports = getWeather;