# Udemy Weather App

## Getting started
This weather app is built from the udemy course, with some extra touches on it. It uses docker as the environment. So all you have to do is clone the project `git clone git@github.com:caesarbell/udemy-weather-app-features.git`.

## Running the app
To build the image against the `Dockerfile`  run `docker image build -t {name-your-image} .`. This will build your image locally "I don't have it on [docker hub](hub.docker.com) :( - It's not worthy". Once the image is build run `docker container  run  -p 8000:8000 --env-file .env {name-of-your-image} node app.js --help` this will list the options available for the weather app. The `-p 8000:8000` is because the app runs on port **8000:8000**  and don't forget to login into [darksky](https://darksky.net/dev) and create your **API Key**. Take that API Key and create your `.env` file in the root of the app and add in your key in the **WEATHERAPI** env variable.

Any code after the image name is consider the commands that will be ran inside the container. To see more on the commands to run look at the **Running the sripts** & **The App** section.


## Running the scripts
Inside the container, you have access to the scripts. With this project there a some familiar folders, such as the playground. Here you can see examples such as basic async callback function and promises. You can see them in action by running `node playground/callback.js` or `node playground/async-basics.js` inside the running docker container.

For the promises thats where things diff from the video a little. The promise logic live inside the root of the playground folder, but calling the functions you have to run the following scripts `node playground/functions/asyncAdd.js`, this script will run a basic function that wraps around a promise, it takes in two integers and adds them, and takes the sum of that and adds it to 10. By default there is another basic promise being called. this method that is wrapping the promise is called **somePromise** , it uses setTimeout to illustrate a 2 second delay. For the last one, `node playground/functions/geoCodeAddress.js` actually triggers a google maps API to get the latitude and longitude, and spits back an address.

## Base URLs
There are two API being hit, one by **googleapis** and the other **darksky**. Both are in an object that are exported from config.js file.


## The App
To get the app running you can run the following script `node app.js` but with this script you have two options you can run. To see the options you can run `node app.js --help`, here you can see a list of options for this app.  For example if you want the weather based on your address or zip you can run the following script `node app.js -a "12603"`. You can also get the weather for the next 7 days, by running the following script `node app.js -a "12601" -f "daily"`.

This would give you results like

```
----------------------------------------------------------------------
The weather based on this address: Poughkeepsie, NY 12601, USA
current temperature is, 37.14, but it actually feels like 31.3
----------------------------------------------------------------------
Thursday temperature high is 51.51 and temperature low is 30.27
Friday temperature high is 45.94 and temperature low is 30.79
Saturday temperature high is 45.21 and temperature low is 28.96
Sunday temperature high is 45.07 and temperature low is 29.73
Monday temperature high is 50.45 and temperature low is 25.54
Tuesday temperature high is 52.06 and temperature low is 30.35
Wednesday temperature high is 55.46 and temperature low is 36.28
Thursday temperature high is 58.78 and temperature low is 40.96
```
