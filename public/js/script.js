const input = document.querySelector('input');
const locactionEL = document.querySelector('.res-location');
const forecastEL = document.querySelector('.res-forecast');

// FORM
document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();

	const address = input.value;
	input.value = '';
	locactionEL.textContent = 'Loading...';

	fetch(`/weather?address=${address}`).then((res) => {
		res.json().then((data) => {
			if (data.error) return (locactionEL.textContent = data.error);

			const { location, forecastData } = data;

			locactionEL.textContent = location;
			forecastEL.textContent = forecastData;
		});
	});
});
