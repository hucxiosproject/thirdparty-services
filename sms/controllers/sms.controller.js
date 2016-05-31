
export function SmsController(smsService) {
	return {
		* sendSms(next) {
			var phone = this.params.phone;
			var sms = yield smsService.sendSms(phone);
			this.body = {
				phone: phone,
				sms: sms
			};
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* validateCode(next) {
			var phone = this.params.phone;
			var code = this.params.code;
			var result = yield smsService.validateCode(phone, code);
			this.body = result;
			this.type = "json";
      this.status = 200;
      yield next;
		}
	};
}