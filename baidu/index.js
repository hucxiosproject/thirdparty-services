import router from "koa-router";
import mount from "koa-mount";

import {BaiduService} from "./services/baidu.service";
import {BaiduController} from "./controllers/baidu.controller";

export default function() {
	var baiduService = new BaiduService();
	var baiduController = new BaiduController(baiduService);

	var r = new router();
	r.get("/baidu/image/:pageSize/:pageIndex/:word", baiduController.searchImage);
	r.get("/location/:longitude/:latitude", baiduController.getLocation);

	console.log("baidu service started");
	return mount("/", r.middleware());
}	