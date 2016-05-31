export function MailController(mailService) {
	return {
		* sendMail(next) {
			var mail = this.request.body.mail;
			var title = this.request.body.title;
			var content = this.request.body.content;

			this.body = yield mailService.sendMail(title, content, mail);
			this.type = "json";
      this.status = 200;
      yield next;
		}
	};
}