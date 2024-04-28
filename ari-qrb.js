/*!
 * 
 *  AriQrb 1.0.1
 *
 *  Copyright (c) 2024 Fabrizio La Racca, https://github.com/flaracca/AriQrb
 *  Licensed under the MIT License.
 *  http://opensource.org/licenses/mit-license
 *
 */
class AriQrb
{
	#StartLocator;
	#EndLocator;
	#ConvertToMiles;

	#LongitudeConverter = {
		A : {
			Degrees: 180,
			Letter: 'W'
		},
		B : {
			Degrees: 160,
			Letter: 'W'
		},
		C : {
			Degrees: 140,
			Letter: 'W'
		},
		D : {
			Degrees: 120,
			Letter: 'W'
		},
		E : {
			Degrees: 100,
			Letter: 'W'
		},
		F : {
			Degrees: 80,
			Letter: 'W'
		},
		G : {
			Degrees: 60,
			Letter: 'W'
		},
		H : {
			Degrees: 40,
			Letter: 'W'
		},
		I : {
			Degrees: 20,
			Letter: 'W'
		},
		J : {
			Degrees: 0,
			Letter: 'E'
		},
		K : {
			Degrees: 20,
			Letter: 'E'
		},
		L : {
			Degrees: 40,
			Letter: 'E'
		},
		M : {
			Degrees: 60,
			Letter: 'E'
		},
		N : {
			Degrees: 80,
			Letter: 'E'
		},
		O : {
			Degrees: 100,
			Letter: 'E'
		},
		P : {
			Degrees: 120,
			Letter: 'E'
		},
		Q : {
			Degrees: 140,
			Letter: 'E'
		},
		R : {
			Degrees: 160,
			Letter: 'E'
		}
	};

	#LatitudeConverter = {
		A : {
			Degrees: 90,
			Letter: 'S'
		},
		B : {
			Degrees: 80,
			Letter: 'S'
		},
		C : {
			Degrees: 70,
			Letter: 'S'
		},
		D : {
			Degrees: 60,
			Letter: 'S'
		},
		E : {
			Degrees: 50,
			Letter: 'S'
		},
		F : {
			Degrees: 40,
			Letter: 'S'
		},
		G : {
			Degrees: 30,
			Letter: 'S'
		},
		H : {
			Degrees: 20,
			Letter: 'S'
		},
		I : {
			Degrees: 10,
			Letter: 'S'
		},
		J : {
			Degrees: 0,
			Letter: ''
		},
		K : {
			Degrees: 10,
			Letter: 'N'
		},
		L : {
			Degrees: 20,
			Letter: 'N'
		},
		M : {
			Degrees: 30,
			Letter: 'N'
		},
		N : {
			Degrees: 40,
			Letter: 'N'
		},
		O : {
			Degrees: 50,
			Letter: 'N'
		},
		P : {
			Degrees: 60,
			Letter: 'N'
		},
		Q : {
			Degrees: 70,
			Letter: 'N'
		},
		R : {
			Degrees: 80,
			Letter: 'N'
		}
	};

	#LongitudeIncrementer = {
		FirstDegree: 2,
		SecondMinutesPerDegree : 5
	};

	#LatitudeIncrementer = {
		FirstDegree: 1,
		SecondMinutesPerDegree : 2.5
	}

	#LatLongLastIncrementer = {
		A: 0,
		B: 1,
		C: 2,
		D: 3,
		E: 4,
		F: 5,
		G: 6,
		H: 7,
		I: 8,
		J: 9,
		K: 10,
		L: 11,
		M: 12,
		N: 13,
		O: 14,
		P: 15,
		Q: 16,
		R: 17,
		S: 18,
		T: 19,
		U: 20,
		V: 21,
		W: 22,
		X: 23
	}
	
	constructor(startLocator, endLocator, convertToMiles = false)
	{
		this.#StartLocator = startLocator.trim().toUpperCase();
		this.#EndLocator = endLocator.trim().toUpperCase();
		this.#ConvertToMiles = convertToMiles;
	}

	calculate()
	{
		if (this.#StartLocator.length != 6)
		{
			throw new Error('Origin WW Locator must be 6 chars long');
		}

		if (this.#EndLocator.length != 6)
		{
			throw new Error('Destination WW Locator must be 6 chars long');
		}

		var startDegrees = this.#getDegrees(this.#StartLocator);
		var endDegrees = this.#getDegrees(this.#EndLocator);

		var a = this.#distanceInKmBetweenEarthCoordinates(startDegrees, endDegrees);

		return (!this.#ConvertToMiles) ? a : (a / 1.609).toFixed(2) ;
	}

	#getDegrees(locator)
	{
		var coordinates = this.#locatorToCoordinate(locator);		
		return this.#coordinatesToDecimalDegrees(coordinates);
	}

	#locatorToCoordinate(locator)
	{
		var chars = Array.from(locator);

		var longitude = {};
		var latitude = {};

		if (!this.#LongitudeConverter.hasOwnProperty(chars[0]))
		{
			throw new Error(`${chars[0]} isn't a valid parameter for longitude (first char)`);
		}

		if (!this.#LatitudeConverter.hasOwnProperty(chars[1]))
		{
			throw new Error(`${chars[1]} isn't a valid parameter for latitude (second char)`);
		}

		if (!this.#LatLongLastIncrementer.hasOwnProperty(chars[4]))
		{
			throw new Error(`${chars[4]} isn't a valid parameter for longitude incrementer (fifth char)`);
		}

		if (!this.#LatLongLastIncrementer.hasOwnProperty(chars[5]))
		{
			throw new Error(`${chars[5]} isn't a valid parameter for latitude incrementer (sixth char`);
		}

		longitude.Letter = this.#LongitudeConverter[chars[0]]['Letter'];
		latitude.Letter = this.#LatitudeConverter[chars[1]]['Letter'];

		longitude.Degrees = this.#LongitudeConverter[chars[0]]['Degrees'];
		latitude.Degrees = this.#LatitudeConverter[chars[1]]['Degrees'];

		longitude.Degrees += (parseInt(chars[2]) * this.#LongitudeIncrementer.FirstDegree);
		latitude.Degrees += (parseInt(chars[3]) * this.#LatitudeIncrementer.FirstDegree);

		var minutesLong = (this.#LatLongLastIncrementer[chars[4]] * this.#LongitudeIncrementer.SecondMinutesPerDegree);
		var minutesLat = (this.#LatLongLastIncrementer[chars[5]] * this.#LatitudeIncrementer.SecondMinutesPerDegree);

		longitude.Minutes = minutesLong;
		if (minutesLong >= 60)
		{
			var a = minutesLong / 60;
			var b = Math.floor(a);
			var c = a - b;

			longitude.Degrees += b;
			longitude.Minutes = Math.round(c * 60);
		}

		latitude.Minutes = minutesLat;
		if (minutesLat >= 60)
		{
			var a = minutesLat / 60;
			var b = Math.floor(a);
			var c = a - b;

			latitude.Degrees += b;
			latitude.Minutes = Math.round(c * 60);
		}
		
		// so far we've got coordinates for the bottom left corner. We add the last correction to get the center

		longitude.Minutes += 2;
		longitude.Seconds = 30;

		latitude.Minutes += 1;
		latitude.Seconds = 15;

		return [longitude, latitude];
	}

	#coordinatesToDecimalDegrees(coordinates)
	{
		var longitude = this.#coordinateToDecimalDegrees(coordinates[0]);
		var latitude = this.#coordinateToDecimalDegrees(coordinates[1]);

		return [longitude, latitude];
	}

	#coordinateToDecimalDegrees(coordinates)
	{
		var degrees = coordinates.Minutes / 60;
		degrees += coordinates.Seconds / 3600;
		degrees += coordinates.Degrees;

		return degrees;
	}

	#degreesToRadians(degrees) {
	  return degrees * Math.PI / 180;
	}

	#distanceInKmBetweenEarthCoordinates(startDegrees, endDegrees) {
	  var earthRadiusKm = 6371;

	  var lat1 = startDegrees[1];
	  var lat2 = endDegrees[1];

	  var lon1 = startDegrees[0];
	  var lon2 = endDegrees[0];

	  var dLat = this.#degreesToRadians(lat2 - lat1);
	  var dLon = this.#degreesToRadians(lon2 - lon1);

	  lat1 = this.#degreesToRadians(lat1);
	  lat2 = this.#degreesToRadians(lat2);

	  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  
	  return (earthRadiusKm * c).toFixed(2);
	}
}
