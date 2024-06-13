# Weather API
Create an app which allows user to get a weather data from https://www.visualcrossing.com/

## Objectives

* Create an endpoint: /weather/cities/:city 
should allow to get a weather for current date for a specific city

* Create an endpoint: /weather/locations/:lat/:lon
should allow to get a weather for current date for a specific location

* Create an endpoint: /weather/historical/cities/:city 
should allow to get weather historical data for a specific date range in past for city and accept dateFrom (start date) and dateTo (end Date) as query parameteres. Dates from future and current date are not accepted.

* Create an endpoint: /weather/historical/locations/:lat/:lon
should allow to get weather historical data for a specific date range in past for city and accept dateFrom (start date) and dateTo (end Date) as query parameteres. Dates from future and current date are not accepted.

* Create an endpoint: /weather/prediction/cities/:city 
should allow to get a weather prediction in specific date range in future for a city and accept dateFrom (start date) and dateTo (end Date) as query parameteres. Dates from past and current date are not accepted.

* Create an endpoint: /weather/prediction/locations/:lat/:lon
should allow to get weather prediction in specific date range in future for city and accept dateFrom (start date) and dateTo (end Date) as query parameteres. Dates from past and current date are not accepted.

## Technologies
Project is created with:
* Node.js
* Express.js
* TypeScript
* Zod
	
## Setup
To run this project, install it locally using npm:

```
# Clone the project
$ git clone https://github.com/dzgierski19/WeatherAPI.git

# Go to the project directory
$ cd Weather-API

# Install dependencies
$ npm install

# Start the server
$ npm run start

```


