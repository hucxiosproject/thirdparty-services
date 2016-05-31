import router from "koa-router";
import mount from "koa-mount";

import {WeatherController} from "./weather.controller.js";
import {WeatherService} from "./weather.service.js";

export default function(path, weatherHost, weatherKey, log) {
  var service = new WeatherService(weatherHost, weatherKey, log);
  var controller = new WeatherController(service);

  var r = new router();
  r.get("/", controller.getWeather);
  return mount(path, r.middleware());
}