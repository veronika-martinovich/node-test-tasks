const getGeocode = require("./utils/getGeocode");
const getWeather = require("./utils/getWeather");

const address = process.argv[2];
if (!address) {
  console.log("Please, provide the address");
}
if (typeof address === "string") {
  getGeocode(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return console.log(error);
    }

    getWeather(latitude, longitude, (error, weatherData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(weatherData);
    });
  });
}
