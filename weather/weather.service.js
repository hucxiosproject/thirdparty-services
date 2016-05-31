import request from "cofy-request";

export class WeatherService {

  constructor(apihost, appkey, log) {
    this._apihost = apihost;
    this._appKey = appkey;
    this._log = log;
  }

  * getWeather(latitude, longitude) {

    let host = this._apihost;
    let key = "key=" + this._appKey;
    let lat = "lat=" + latitude;
    let lon = "lon=" + longitude;
    let url = host + "?" + key + "&" + lat + "&" + lon;

    let response = yield request.$get({
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': "application/json;charset=UTF-8"
      }
    });
    let statusCode = response[0].statusCode;
    if (statusCode == 200) {
      let body = JSON.parse(response[0].body);
      return body;
    } else {
      this._log.error(`err when get weather, url is ${url}, result is ${response[0].body}`);
      throw {status: 501, message: 'cannot get weather info'};
    }
  }
}