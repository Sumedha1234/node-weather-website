const request = require("request");
const forecast = (latitude, longitude, callback) => {
  //   const url = `http://api.weatherstack.com/current?access_key=f5d797723195e2075cc37c9fe83b9c45&query=${address}`;
  // const url = `http://api.weatherstack.com/current?access_key=f5d797723195e2075cc37c9fe83b9c45&query=${address.latitude},${address.longitude}`;
  const url = `http://api.weatherstack.com/current?access_key=f5d797723195e2075cc37c9fe83b9c45&query=${latitude},${longitude}`;
  console.log("dfdsfd0000000000000000000000000000000000000 "+url);
  request(url, { json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
