// Always refer Express documentaton - https://expressjs.com/en/4x/api.html

// Express library sends a single function express()
// returns express module.

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location through express setting
hbs.registerPartials(partialsDir);
app.set('view engine', 'hbs');
app.set('views', viewsDir);

// Static Directory serve
// app.use(express.static('../public'));
app.use(express.static(publicDir));

app.get('/', (req, res) => {
	res.render('index', {
		heading: 'Weather App',
		para: 'Dynamic asset, using HBS (view engine), by Vatsal',
	});
});

// Endpoint
app.get('/weather', (req, res) => {
	if (!req.query.address)
		return res.send({ error: 'Error: Address must be there' });

	const address = req.query.address;

	// To get Lat/Lon of the location
	geocode(address, (error, { lat, lon, location } = {}) => {
		// return will break the flow! can also use ELSE
		if (error) return res.send({ error });

		// To get the forecast of the location
		forecast(lat, lon, (error, forecastData) => {
			if (error) return res.send({ error });

			// MAIN
			res.send({
				address,
				location,
				coords: [lat, lon],
				forecastData,
			});
		});
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		para: 'I need someone to love 😭',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		heading: 'I need help',
		name: 'Vedika Kamane',
		relation: ['Ex-Girlfriend', ' Crush 😢'],
		feelings: ['miss her', ' want to talk', ' want to meet', ' stay together'],
	});
});

app.get('*', (req, res) => {
	res.send('Error 404 page not found');
});

app.listen(80, () => {
	console.log('Server Started!!!');
});
