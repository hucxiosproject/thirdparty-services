import router from "koa-router";
import mount from "koa-mount";

import {EasychatService} from "./services/easychat.service";
import {EasychatController} from "./controllers/easychat.controller";

export default function(path) {
	var service = new EasychatService();
	var controller = new EasychatController(service);

	var r = new router();
	r.put("/:token/:app/user/password/:key", controller.resetPassword);
	r.post("/:token/:app/user/:key", controller.createUser);
	r.get("/:token/:app/user/status/:userId/:key", controller.userStatus);
	r.put("/:token/:app/user/status/remove/:key", controller.userOffline);
	r.post("/:token/:app/group/:key", controller.createGroup);
	r.get("/:token/:app/group/:groupId/:key", controller.getGroup);
	r.put("/:token/:app/group/user/:key", controller.addUserToGroup);
	r.put("/:token/:app/group/users/:key", controller.addUsersToGroup);
	r.put("/:token/:app/group/user/remove/:key", controller.removeUserFromGroup);
	r.put("/:token/:app/group/users/remove/:key", controller.removeUsersFromGroup);
	r.post("/:token/:app/cmd/users/:key", controller.sendCommandToUsers);
	r.post("/:token/:app/cmd/user/:key", controller.sendCommandToUser);
	r.post("/:token/:app/cmd/group/:key", controller.sendCommandToGroup);

	console.log("chat service started");
	return mount(path, r.middleware());
}