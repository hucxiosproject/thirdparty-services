//如果存在中文以及yield，编译以及运行不会通过，所以需要这个
export class Util {
	static getSmsContent(code) {
		var params = "&content=您的验证码是：【" + code + "】。请不要把验证码泄露给其他人。";
		return params;
	}
}