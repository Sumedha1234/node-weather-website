const request = require("request");

const geocode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VtZWRoYWF1dG9tYXRpb24iLCJhIjoiY2txOGNsaWVsMDVmNTJvcGtyYWhtaTl3aCJ9.8do_yTdPnYfQBN4Z6Wy12w&limit=1`;

  request( geocodeUrl ,{json:true}, (error, {body}) => {
    if (error) {
      callback("Unable to connect to the location service", undefined);
    } else if (body && body.message === "Not Found") {

      callback("Location not found");
    } else if (body.features.length === 0) {

      callback("Unable to find the location");
    } else {

      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geocode;
