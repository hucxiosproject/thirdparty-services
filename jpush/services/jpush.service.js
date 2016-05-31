import request from "cofy-request";

var base64 = require('base-64');

export class JPushService {
  constructor() {
    this._auth = base64.encode(process.env.JPUSH_APPKEY+":"+process.env.JPUSH_MASTER_SECRET);
    this.PLATFORM_IOS = 1;
    this.PLATFORM_Android = 2;
  }

  * sendPushToAll(message,extra) {
    var url = process.env.JPUSH_URL;
    var res = yield request.$post({
      url: url,
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+this._auth
      },
      json:true,
      body:{
        platform: ["ios"],
        audience:"all",
        notification: {
          ios: {
            alert: message,
            sound: "default",
            badge: "+1",
            extras: extra
          }
        },
        "message": {
          "title": message,
          "msg_content": message,
          "content_type": "text",
          "extras": extra
        },
        "options": {
          "apns_production": false
        }
      }
    });

    console.log(res[0].body)
    
    res = yield request.$post({
      url: url,
      method: 'POST',
      headers: {
        'Authorization': 'Basic '+this._auth
      },
      json:true,
      body:{
        platform: ["android"],
        audience:"all",
        "message": {
          "title": message,
          "msg_content": message,
          "content_type": "text",
          "extras": extra
        }
      }
    });

    console.log(res[0].body)

    let result = res[0].body;
    if (result && String(result.sendno) == '0')
      return {result: true, msg_id: result.msg_id};
    return {result: false, message: res[0].body};
  }

  * sendPushToUsers(users,message,extra) {
    var android = {
      platform:"android",
      users:[]
    };
    var ios = {
      platform:"ios",
      users:[]
    };
    if(users.constructor == Array && users.length>0){
      for(var i=0;i<users.length;i++){
        if(parseInt(users[i].platform) == this.PLATFORM_Android){
          android.users.push(users[i].key);
        }else if(parseInt(users[i].platform) == this.PLATFORM_IOS){
          ios.users.push(users[i].key);
        }
      }
    }
    var url = process.env.JPUSH_URL;
    var result = {};
    if(android.users.length>0){
      var androidBody = {
        platform:["android"],
        audience:{
          registration_id:android.users
        },
        "message": {
          "title": message,
          "msg_content": message,
          "content_type": "text",
          "extras": extra
        }
      };

      var androidResult = yield request.$post({
        url: url,
        method: 'POST',
        headers: {
          'Authorization': 'Basic '+this._auth
        },
        json:true,
        body:androidBody
      });
      result.android = androidResult[0].body
    }
    if(ios.users.length>0){
      var iosBody = {
        platform:["ios"],
        audience:{
          registration_id:ios.users
        },
        "notification": {
          ios: {
            alert: message,
            sound: "default",
            badge: "+1",
            extras: extra
          }
        },
        "options": {
          "apns_production": false
        }
      };

      var iosResult = yield request.$post({
        url: url,
        method: 'POST',
        headers: {
          'Authorization': 'Basic '+this._auth
        },
        json:true,
        body:iosBody
      });
      result.ios = iosResult[0].body
    }

    if (result && result.android) {
      if (result && String(result.android.sendno) == '0')
        return {result: true, msg_id: result.android.msg_id};
      return {result: false, message: result.android};
    } else if (result && result.ios) {
      if (result && String(result.ios.sendno) == '0')
        return {result: true, msg_id: result.ios.msg_id};
      return {result: false, message: result.ios};
    }
    return {result: false};
  }
}