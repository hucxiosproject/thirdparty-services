import router from "koa-router";
import mount from "koa-mount";

import {SmsController} from "./controllers/sms.controller";
import {SmsService} from "./services/sms.service";

export default function(path, smsAccount, smsPassword, log) {
	var smsService = new SmsService(smsAccount, smsPassword, log);
	var smsController = new SmsController(smsService);

	var r = new router();
	r.get("/sms/:phone/:token", smsController.sendSms);
	r.get("/sms/:phone/:code/:token", smsController.validateCode);

	console.log("smsService started");
	return mount(path, r.middleware());
}