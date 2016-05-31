import router from "koa-router";
import mount from "koa-mount";

import {JPushController} from "./controllers/jpush.controller";
import {JPushService} from "./services/jpush.service";

export default function(path,jPushKey, jPushMasterSecret) {

	var jPushService = new JPushService();
	var jPushController = new JPushController(jPushService);

	var r = new router();
	r.post("/all", jPushController.sendJPushToAll);
  r.post("/users", jPushController.sendJPushToUsers);

	console.log("jPushService started");
	return mount(path, r.middleware());
}