
export function BaiduController(baiduService) {
	return {
		* searchImage(next) {
			var from = this.params.pageIndex;
			var size = this.params.pageSize;
			var word = this.params.word;
			this.body = yield baiduService.searchImage(from, size, word);
			this.type = "json";
      this.status = 200;
      yield next;
		},

		* getLocation(next) {
			var longitude = this.params.longitude;
			var latitude = this.params.latitude;

			this.body = yield baiduService.getLocation(longitude, latitude);
			this.type = "json";
      this.status = 200;
      yield next;
		}
	};
}