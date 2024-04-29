/*!
 * 
 *  AriQrb 1.0.1
 *
 *  Copyright (c) 2024 Fabrizio La Racca, https://github.com/flaracca/AriQrb
 *  Licensed under the MIT License.
 *  http://opensource.org/licenses/mit-license
 *
 *  SOURCES (italian):
 *  https://iz8bgypino.jimdofree.com/home-page/il-locatore-wwl/
 *  https://www.iu1lcp.it/i-radioamatori/world-wide-locator/
 */
class AriQrb
{
	#StartLocator;
	#EndLocator;

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
	
	constructor(startLocator, endLocator)
	{
		this.#StartLocator = startLocator.trim().toUpperCase();
		this.#EndLocator = endLocator.trim().toUpperCase();
	}

	calculateDistance(convertToMiles = false)
	{
		if (this.#initialValidation())
		{
			var startDegrees = this.#getDegrees(this.#StartLocator);
			var endDegrees = this.#getDegrees(this.#EndLocator);

			var a = this.#distanceInKmBetweenEarthCoordinates(startDegrees, endDegrees);

			return (!convertToMiles) ? a : (a / 1.609).toFixed(2) ;
		}		
	}

	getCoordinates()
	{
		if (this.#initialValidation())
		{
			var startCoordinates = this.#locatorToCoordinate(this.#StartLocator);
			var endCoordinates = this.#locatorToCoordinate(this.#EndLocator);
			var r = {
					 	start:
					 	{
							locator: this.#StartLocator, 
							coordinates: 
							{
								longitude: startCoordinates[0], 
								latitude: startCoordinates[1]
							}
						},
						end: 
						{
							locator: this.#EndLocator,
							coordinates:
							{
								longitude: endCoordinates[0], 
								latitude: endCoordinates[1]
							}
						}
					};
			return r;
		}
	}

	getDecimalCoordinates()
	{
		if (this.#initialValidation())
		{
			var startCoordinates = this.#coordinatesToDecimalDegrees(this.#locatorToCoordinate(this.#StartLocator));
			var endCoordinates = this.#coordinatesToDecimalDegrees(this.#locatorToCoordinate(this.#EndLocator));
			var r = { start: {locator: this.#StartLocator, coordinates:startCoordinates}, end: {locator: this.#EndLocator, coordinates:endCoordinates}};
			return r;
		}
	}

	#getDegrees(locator)
	{
		var coordinates = this.#locatorToCoordinate(locator);		
		return this.#coordinatesToDecimalDegrees(coordinates);
	}

	#initialValidation()
	{
		if (this.#StartLocator.length != 6)
		{
			throw new Error('Origin WW Locator must be 6 chars long');
		}

		if (this.#EndLocator.length != 6)
		{
			throw new Error('Destination WW Locator must be 6 chars long');
		}

		return true;
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

		var operatorLongitude = (longitude.Letter == 'W') ? -1 : 1;
		var operatorLatitude = (latitude.Letter == 'S') ? -1 : 1;

		longitude.Degrees = this.#LongitudeConverter[chars[0]]['Degrees'];
		latitude.Degrees = this.#LatitudeConverter[chars[1]]['Degrees'];

		longitude.Degrees += ((parseInt(chars[2]) * this.#LongitudeIncrementer.FirstDegree) * operatorLongitude);
		latitude.Degrees += ((parseInt(chars[3]) * this.#LatitudeIncrementer.FirstDegree) * operatorLatitude);

		var minutesLong = (this.#LatLongLastIncrementer[chars[4]] * this.#LongitudeIncrementer.SecondMinutesPerDegree);
		var minutesLat = (this.#LatLongLastIncrementer[chars[5]] * this.#LatitudeIncrementer.SecondMinutesPerDegree);

		if (longitude.Letter == 'E')
		{
			if (minutesLong >= 60)
			{
				var a = minutesLong / 60;
				var b = Math.floor(a);
				var c = a - b;

				longitude.Degrees += b;
				longitude.Minutes = Math.floor(c * 60);
			}
			else
			{
				longitude.Minutes = minutesLong;
				if ((!Number.isInteger(minutesLong)))
				{
					var minsFloored = Math.floor(minutesLong);
					var difference = minutesLong - minsFloored;

					longitude.Minutes = (difference <= 0.5) ? minsFloored : Math.ceil(minutesLong);
				}
			}
		}
		else
		{
			if (minutesLong >= 60)
			{
				var a = minutesLong / 60;
				var b = Math.floor(a);
				var c = a - b;

				longitude.Degrees -= b;
				longitude.Minutes = 60 - Math.floor(c * 60);
			}
			else
			{
				longitude.Minutes = 60 - minutesLong;
				longitude.Degrees -= 1;
			}
		}
		
		if (latitude.Letter == 'N')
		{
			latitude.Minutes = (!Number.isInteger(minutesLat)) ? Math.round(minutesLat) : minutesLat;
			if (minutesLat >= 60)
			{
				var a = minutesLat / 60;
				var b = Math.floor(a);
				var c = a - b;

				latitude.Degrees += b;
				latitude.Minutes = Math.floor(c * 60);
			}
			else
			{
				latitude.Minutes = minutesLat;
				if ((!Number.isInteger(minutesLat)))
				{
					var minsFloored = Math.floor(minutesLat);
					var difference = minutesLat - minsFloored;

					latitude.Minutes = (difference <= 0.5) ? minsFloored : Math.ceil(minutesLat);
				}
			}
		}
		else
		{
			if (minutesLat >= 60)
			{
				var a = minutesLat / 60;
				var b = Math.floor(a);
				var c = a - b;

				latitude.Degrees -= b;
				latitude.Minutes = 60 - Math.floor(c * 60);
			}
			else
			{
				latitude.Minutes = 60 - minutesLat;
				latitude.Degrees -= 1;
			}
		}
		
		// so far we've got coordinates for the bottom left corner. We add the last correction to get the center

		if (longitude.Letter == 'E')
		{
			longitude.Minutes += 2;
			longitude.Seconds = 30;
		}
		else
		{
			if (longitude.Minutes >= 2)  // 3' - 1'30" = 1' 30"
			{
				longitude.Minutes -= 2;
			}
			else
			{
				longitude.Degrees -= 1;
				var minutes = longitude.Minutes - 2;
				longitude.Minutes = 60 - minutes;
			}
			longitude.Seconds = 30;
		}

		if (latitude.Letter == 'N')
		{
			latitude.Minutes += 1;
			latitude.Seconds = 15;
		}
		else
		{
			if (latitude.Minutes >= 1)  // 3' - 1'345" = 1' 45"
			{
				latitude.Minutes -= 2;
			}
			else
			{
				latitude.Degrees -= 1;
				var minutes = latitude.Minutes - 1;
				latitude.Minutes = 60 - minutes;
			}
			latitude.Seconds = 45;
		}
			
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
		var degrees = (coordinates.Minutes / 60) + (coordinates.Seconds / 3600) + coordinates.Degrees;

		degrees *= (coordinates.Letter == 'E' || coordinates.Letter == 'N') ? 1 : -1;
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
