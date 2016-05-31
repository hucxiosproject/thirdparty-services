import mount from "koa-mount";

export function ValidationController(secretKey) {
	return {
		* validate(next) {
			var token;
			if (this.request.body) {
				token = this.request.body.token;
				if (token && token == secretKey) {
					return yield next;
				}
			}

			if (this.query && this.query.token) {
				token = this.query.token;
				if (token && token == secretKey) {
					return yield next;
				}
			}
			
			var url = this.request.url;
			var urlparams = url.split("/");
			token = urlparams[urlparams.length-1];
			if (token && token == secretKey) {
				return yield next;
			}
			this.status = 500;
			this.body = "请确认传递了token";
		}
	};	
}

export default function(path, secretKey) {
	var validate = new ValidationController(secretKey);
	return mount(path, validate.validate);
}