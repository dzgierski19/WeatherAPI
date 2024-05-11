#Weather API
Create an app which allows user to get a weather data from https://www.visualcrossing.com/

#Objectives:
[ ] Create an app, address: http://127.0.0.1:<server-port>/weather
[ ] Create an endpoint: /get/cities/:city should allow to get a weather for current date for a specific city
[ ] Create an endpoint: /get/locations/:lat/:lon should allow to get a weather for current date for a specific location
[ ] Create an endpoint: /prediction/:day/:city should allow to get weather data for a specific date
[ ] Create an endpoint: /prediction/cities/:city should allow to get a weather data for a specific city and specific data range. 

Accept as query params:

from - start date
to - end date
[ ] Create an endpoint: /prediction/:lat/:lon should allow to get a weather data for a specific location and specific data range. 

Accept as query params:

from - start date
to - end date
[ ] App under the: /prediction* endpoints should not work for current or past date
[ ] App should accept: X-Weather-API-KEY in headers with user api key for https://www.visualcrossing.com/