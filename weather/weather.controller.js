
export function WeatherController(service) {
  return {
    * getWeather(next) {
      var latitude = this.query.latitude;
      var longitude = this.query.longitude;
      var result = yield service.getWeather(latitude, longitude);
      this.body = result;
      this.type = "json";
      this.status = 200;
      yield next;
    }
  };
}