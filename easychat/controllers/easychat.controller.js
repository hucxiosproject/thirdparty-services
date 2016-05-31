export function EasychatController(easychatService) {
	return {
		* resetPassword(next) {
			var token = this.params.token;
			var app = this.params.app;
			var userId = this.request.body.userId;
			var password = this.request.body.password;

			var result = yield easychatService.resetPassword(token, app, userId, password);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* createUser(next) {
			var token = this.params.token;
			var app = this.params.app;
			var userId = this.request.body.userId;
			var password = this.request.body.password;

			var result = yield easychatService.createUser(token, app, userId, password);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* userStatus(next) {
			var token = this.params.token;
			var app = this.params.app;
			var userId = this.params.userId;

			var result = yield easychatService.isUserOnline(token, app, userId);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* userOffline(next) {
			var token = this.params.token;
			var app = this.params.app;
			var userId = this.request.body.userId;

			var result = yield easychatService.forceUserOffline(token, app, userId);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* createGroup(next) {
			var token = this.params.token;
			var app = this.params.app;
			var name = this.request.body.name;
			var desc = this.request.body.desc;
			var owner = this.request.body.owner;

			var result = yield easychatService.createGroup(token, app, name, desc, owner);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* getGroup(next) {
			var token = this.params.token;
			var app = this.params.app;
			var groupId = this.params.groupId;

			var result = yield easychatService.getGroup(token, app, groupId);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* addUserToGroup(next) {
			var token = this.params.token;
			var app = this.params.app;
			var groupId = this.request.body.groupId;
			var userId = this.request.body.userId;

			var result = yield easychatService.addUserToGroup(token, app, groupId, userId);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* addUsersToGroup(next) {
			var token = this.params.token;
			var app = this.params.app;
			var groupId = this.request.body.groupId;
			var userIds = this.request.body.userIds;

			var result = yield easychatService.addUsersToGroup(token, app, groupId, userIds);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* removeUserFromGroup(next) {
			var token = this.params.token;
			var app = this.params.app;
			var groupId = this.request.body.groupId;
			var userId = this.request.body.userId;

			var result = yield easychatService.removeUserFromGroup(token, app, groupId, userId);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* removeUsersFromGroup(next) {
			var token = this.params.token;
			var app = this.params.app;
			var groupId = this.request.body.groupId;
			var userIds = this.request.body.userIds;

			var result = yield easychatService.removeUsersFromGroup(token, app, groupId, userIds);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* sendCommandToUsers(next) {
			var token = this.params.token;
			var app = this.params.app;
			var action = this.request.body.action;
			var userIds = this.request.body.userIds;

			var result = yield easychatService.sendCommandToUsers(token, app, userIds, action);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* sendCommandToUser(next) {
			var token = this.params.token;
			var app = this.params.app;
			var action = this.request.body.action;
			var userId = this.request.body.userId;

			var result = yield easychatService.sendCommandToUser(token, app, userId, action);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* sendCommandToGroup(next) {
			var token = this.params.token;
			var app = this.params.app;
			var action = this.request.body.action;
			var groupId = this.request.body.groupId;

			var result = yield easychatService.sendCommandToGroup(token, app, groupId, action);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		}
	};
}