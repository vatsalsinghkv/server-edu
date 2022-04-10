const request = require('request');

// Geocoding: Address -> Lat/Lon

const geocode = function (addr, callback) {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=pk.eyJ1IjoidmF0c2Fsc2luZ2hrdiIsImEiOiJja3I3cmh6dDEzcnZxMm9xYXZzMXUzdjNjIn0.1q-CaWeiHbovByKCpHPVMw&limit=1`;

	request({ url, json: true }, (err, res) => {
		// json: true -> data will be parsed from JSON string to OBJECT (typeof res.body === Object)

		if (err) {
			callback('Unable to connect to Geocoding Services', undefined);
		} else if (!res.body.features.length) {
			callback('Unable to find the location. Try another search', undefined);
		} else {
			// Features = array of found locations

			const location = res.body.features[0];
			const [lon, lat] = [...location.center];
			// longitude at first center[0]

			callback(undefined, {
				lat,
				lon,
				location: location.place_name,
			});
		}
	});
};

module.exports = geocode;
