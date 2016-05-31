var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');

export class MailService {

	constructor(user, password, username, smtp, port) {
		this._user = user;
		this._password = password;
		this._username = username;
		this._smtp = smtp;
		this._port = port;

		var options = {
			host: this._smtp,
			port: this._port,
			auth: {
				user : this._user,
				pass: this._password
			},
			maxConnections: 500,
			maxMessages: 1000,
			rateLimit: 500
		};
		this._transporter = nodemailer.createTransport(smtpPool(options));
	}

	* sendMail(title, content, tomail) {
		console.log(tomail);
		var result = this._transporter.sendMail({
	    from: this._user,
	    to: tomail,
	    subject: title,
	    text: content
		});
		return true;
	}
}