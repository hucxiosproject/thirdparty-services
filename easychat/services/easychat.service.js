import request from "cofy-request";
import queryString from "querystring";

var INFORM_ANNOUNCE_PEOPLE = 1;
var INFORM_RECEIVE_RES = 2;
var INFORM_POST = 3;

class ServiceError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

export class EasychatService {

	constructor() {
    this.requestUrl = "https://a1.easemob.com/voc/";
	}

  * createUser(token, app, username, password) {
    var param = {
      username: username,
      password: password
    };
    var res = yield request.$post({
      url: this.requestUrl + app + "/users",
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': "application/json;charset=UTF-8"
      },
      body: JSON.stringify(param)
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.entities[0];
    }
    throw new ServiceError(statusCode, body);
  }

	//user
	* resetPassword(token, app, username, password) {
		var param = {
			newpassword: password
		};
		var res = yield request.$post({
      url: this.requestUrl + app + "/users/" + username + "/password",
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': "application/json;charset=UTF-8"
      },
      body: JSON.stringify(param)
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200)
      return body;
    throw new ServiceError(statusCode, body);
	}

  * isUserOnline(token, app, userId) {
    var res = yield request.$get({
      url: this.requestUrl + app + "/users/" + userId + "/status",
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    var body = JSON.parse(res[0].body).data;
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body[userId];
    }
    throw new ServiceError(statusCode, body);
  }

  * forceUserOffline(token, app, userId) {
    var res = yield request.$get({
      url: this.requestUrl + app + "/users/" + userId + "/disconnect",
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': "application/json;charset=UTF-8"
      }
    });
    var body = (JSON.parse(res[0].body));
    var statusCode = res[0].statusCode;
    if (statusCode == 200) 
      return body;
    throw new ServiceError(statusCode, body);
  }

  //
  //gropup
  //

  * createGroup(token, app, name, desc, owner) {
    var param = {
      groupname: name,
      desc: desc,
      'public': true,
      maxuser: 5000,
      approval: false,
      owner: owner
    };
    var res = yield request.$post({
      url: this.requestUrl + app + "/chatgroups",
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': "application/json;charset=UTF-8"
      },
      body: JSON.stringify(param)
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data.groupid;
    }
    throw new ServiceError(statusCode, body);
  }

  * getGroup(token, app, groupId) {
    var res = yield request.$get({
      url: this.requestUrl + app + "/chatgroups/" + groupId,
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data[0];
    }
    throw new ServiceError(statusCode, body);
  }

  * addUserToGroup(token, app, groupId, userId) {
    var res = yield request.$post({
      url: this.requestUrl + app + "/chatgroups/" + groupId + "/users/" + userId,
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data;
    }
    throw new ServiceError(statusCode, body);
  }

  * addUsersToGroup(token, app, groupId, userIds) {
    var body = {
      usernames: users
    };
    body = JSON.stringify(body);

    var res = yield request.$post({
      url: this.requestUrl + "/chatgroups/" + groupId + "/users",
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + this.token
      },
      body: body
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data;
    }
    throw new ServiceError(statusCode, body);
  }

  * removeUserFromGroup(token, app, groupId, userId) {
    var res = yield request.$del({
      url: this.requestUrl + app + "/chatgroups/" + groupId + "/users/" + userId,
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data;
    }
    throw new ServiceError(statusCode, body);
  }

  * removeUsersFromGroup(token, app, groupId, userIds) {
    var userString = "";
    var i = 0;
    for (i; i < userIds.length - 2 ; i ++) {
      userString += userIds[i] + ","
    }
    userString += userIds[i];
    var res = yield request.$del({
      url: this.requestUrl + app + "/chatgroups/" + groupId + "/users/" + userString,
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data;
    }
    throw new ServiceError(statusCode, body);
  }

  //
  // chat room
  //
  * createChatroom(token, app, name, desc, owner) {
    var param = {
      name: name,
      description: desc,
      maxuser: 5000,
      owner: owner
    };
    param = JSON.stringify(param);
    var res = yield request.$post({
      url: this.requestUrl + app + "/chatrooms",
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': "application/json;charset=UTF-8"
      },
      body: JSON.stringify(param)
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data.id;
    }
    throw new ServiceError(statusCode, body);
  }

  * getChatroom(token, app, id) {
    var res = yield request.$get({
      url: this.requestUrl + app + "/chatrooms/"+id,
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data[0];
    }
    throw new ServiceError(statusCode, body);
  }

  * addUserToChatroom(token, app, roomId, userId) {
    var res = yield request.$post({
      url: this.requestUrl + app + "/chatrooms" + "/users/" + userId,
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': "application/json;charset=UTF-8"
      }
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data;
    }
    throw new ServiceError(statusCode, body);
  }

  * removeUserFromChatroom(token, app, roomId, userId) {
    var res = yield request.$del({
      url: this.requestUrl + app + "/chatrooms" + roomId + "/users/" + userId,
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data;
    }
    throw new ServiceError(statusCode, body);
  }

  * removeChatroom(token, app, roomId) {
    var res = yield request.$del({
      url: this.requestUrl + app + "/chatrooms" + roomId,
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    var body = JSON.parse(res[0].body);
    var statusCode = res[0].statusCode;
    if (statusCode == 200) {
      return body.data;
    }
    throw new ServiceError(statusCode, body);
  }

  //
  // send command
  //
  * sendCommandToUsers(token, app, users, action) {
    var response = yield this._sendCommand(token, app, users, action, "users");
    var statusCode = response.statusCode;
    if (statusCode == 200) {
      return response.data;
    }
    throw new ServiceError(statusCode, response.body);
  }

  * sendCommandToUser(token, app, user, action) {
    var response = yield this._sendCommand(token, app, [user], action, "users");
    var statusCode = response.statusCode;
    if (statusCode == 200) {
      return response.data;
    }
    throw new ServiceError(statusCode, response.body);
  }

  * sendCommandToGroup(token, app, groupid, action) {
    var response = yield this._sendCommand(token, app, [groupid], action, "chatgroups");
    var statusCode = response.statusCode;
    if (statusCode == 200) {
      return response.data;
    }
    throw new ServiceError(statusCode, response.body);
  }

  * _sendCommand(token, app, targetUser, action, type) {

    var param = {
      "target_type": type, //"users",
      "target": targetUser,
      "msg":{
        "type":"cmd",
        "action": "'" + JSON.stringify(action) + "'"
      },
      "ext":{

      }
    };
    var res = yield request.$post({
      url: this.requestUrl + app + "/messages",
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
        'Content-Type': "application/json;charset=UTF-8"
      },
      body: JSON.stringify(param)
    });
    return res[0];
  }
}