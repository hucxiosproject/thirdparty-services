import router from "koa-router";
import mount from "koa-mount";

import {MailController} from "./mail.controller";
import {MailService} from "./mail.service";

export default function(path, user, password, username, smtp, port) {
	var service = new MailService(user, password, username, smtp, port);
	var controller = new MailController(service);

	var r = new router();
	r.post("/:token", controller.sendMail);
	console.log("mail router started");
	return mount(path, r.middleware());
}