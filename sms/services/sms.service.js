import request from "cofy-request";

import {Util} from "./util";

var HALF_DAY = 43200;
var TWO_HOURS = 7200;
var HALF_HOUR = 1800;
var ONE_HOUR = 3600;
var ONE_MINUTE = 60;

export class ServiceError {
	constructor(status, msg) {
		this.status = status;
		this.message = msg;
	}
}

export class SmsService {

	constructor(account, password, log) {
		this.account = account;
		this.password = password;
    this._log = log;

    this._smsCached = new Map();
    setInterval(() => {
      try {
        this._clearTimeoutSms();
      } catch (err) {
        this._log.error(err.stack);
      }
    }, 1000);
	}

	* sendSms(phone) {
		var isPhone = this._phoneCorrect(phone);
		if (!isPhone) 
			throw {status: 501, message: "phone incorrect"};
    if (this._smsCached.has(String(phone)))
       throw {status: 501, message: "send sms duplicated"};

		var code = this._getRandomNumber(1000, 9999);
		var params = this._getParams(phone, code);
		var url = "http://106.ihuyi.cn/webservice/sms.php" + params;
		url = encodeURI(url);
		var res = yield request.$get({
			url: url,
			method: 'GET',
			headers: {
				'Content-Type': "application/json;charset=UTF-8"
			}
		});
		
		this._addSmsPhone(phone, code);
		return code;
	}

	* validateCode(phone, code) {
    if (this._smsCached.has(String(phone))) {
      let result = this._checkSmsCorrect(phone, code);
      if (!result) 
        throw new ServiceError(501, "code error");
      return true;
    }
    throw new ServiceError(502, "code expired");
	}

	_getRandomNumber(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  }

  _phoneCorrect(telphone) {
  	var isPhone = /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    telphone.trim();

    if (telphone.length !== 11) {
      return false;
    }
    else {
      if (isPhone.test(telphone)) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  _getParams(phone, code) {
  	return "?method=Submit&account=" + this.account + "&password=" + this.password + "&mobile=" + phone + Util.getSmsContent(code);
  }

  _addSmsPhone(phone, sms) {
    this._smsCached.set(String(phone), {code: String(sms), time: Date.now()});
  }

  _checkSmsCorrect(phone, sms) {
    if (this._smsCached.has(String(phone))) {
      let data = this._smsCached.get(String(phone));
      if (String(sms) === String(data.code))
        return true;
    }
    return false;
  }

  _clearTimeoutSms() {
    let now = Date.now();
    for (let phone of this._smsCached.keys()) {
      let sms = this._smsCached.get(phone);
      let delta = now - sms.time;
      if (delta >= 60000) {
        this._smsCached.delete(phone);
      }
    }
  }
}