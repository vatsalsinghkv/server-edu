const request = require('request');

const forecast = function (lat, lon, callback) {
	const url = `http://api.weatherstack.com/current?access_key=ff775265761204c41f31c7e6e7fdf4fd&query=${lat},${lon}`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to Weather Services', undefined);
		} else if (body.error) {
			// Errors in URL (input)
			const error = res.body.error;
			callback(
				`Error Code: ${error.code}\nUnable to find the location`,
				undefined
			);
		} else {
			// Data
			const current = body.current;

			// Main
			let str = `${current.weather_descriptions}. It is currently ${current.temperature}°C out. It feels like ${current.feelslike}°C.`;

			callback(undefined, str);
		}
	});
};

module.exports = forecast;
