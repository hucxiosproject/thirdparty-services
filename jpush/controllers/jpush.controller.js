
export function JPushController(jPushService) {
	return {
    * sendJPushToAll(next) {
      var message = this.request.body.message;
      var extra = this.request.body.extra;
      var res = yield jPushService.sendPushToAll(message,extra);
      this.body = res;
      this.type = "json";
      this.status = 200;
      yield next;
    },
    * sendJPushToUsers(next) {
      var message = this.request.body.message;
      var extra = this.request.body.extra;
      var users = this.request.body.users;
      if(users.constructor !== Array || users.length==0){
        this.status = 500;
        this.body = "users 不得为空";
        yield next;
      }
      this.body = yield jPushService.sendPushToUsers(users,message,extra);
      this.type = "json";
      this.status = 200;
      yield next;
    }
	};
}