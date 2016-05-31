import request from "cofy-request";

export class BaiduService {
	constructor() {

	}

	* searchImage(from, size, word) {
		var pageIndex = parseInt(from) + 60;
		var baiduUrl = `http://image.baidu.com/search/avatarjson?tn=resultjsonavatarnew&ie=utf-8&word=${word}&cg=girl&pn=${pageIndex}&rn=${size}&itg=0&z=0&fr=&width=&height=&lm=-1&ic=0&s=0&st=-1&gsm=360600003c`;
		baiduUrl = encodeURI(baiduUrl);
		var res = yield request.$get({
		url: baiduUrl,
		method: 'GET',
		headers: {
        'Content-Type': "application/json;charset=UTF-8",
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
      }
		});
		return (JSON.parse(res[0].body));
	}

	* getLocation(longitude, latitude) {
		var params="ak=IuYSZnKvmKCuVBTdUBwXyAch&location=" + latitude + "," + longitude + "&output=json&pois=1";
    var url = "http://api.map.baidu.com/geocoder/v2/?" + params;
    url = encodeURI(url);
    var r = yield request.$request(url);
    r = JSON.parse(r[0].body);
    return {
      fulladdress: r.result.formatted_address,
      address: r.result.addressComponent.city + r.result.addressComponent.district,
      city: r.result.addressComponent.city,
      cityCode:r.result.cityCode,
      district: r.result.addressComponent.district,
      street: r.result.addressComponent.street,
      street_number: r.result.addressComponent.street_number
    };
	}
}