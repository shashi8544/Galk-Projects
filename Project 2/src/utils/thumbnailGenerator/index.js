export default function ThumbnailGenerator() {
	return {
		video: document.createElement("video"),
		canvas: document.createElement("canvas"),
		ratio: 1,
		thumbnail: undefined,
		height: NaN,
		width: NaN,
		pauseShedule: false,
		url: undefined,
		thumbnailBlob: undefined,
		timerCallback: function () {
			if (this.video.paused || this.video.ended) {
				return;
			}
			this.computeFrame();
			let self = this;
			setTimeout(function () {
				self.timerCallback();
			}, 0);
		},

		createThumbnail: function (file, width) {
			if (!file) return;
			if (!width || isNaN(width)) width = 200;
			if (width > 300) width = 300;
			this.canvasContext = this.canvas.getContext("2d");
			let self = this;
			let url = window.URL.createObjectURL(file);
			this.url = url;
			self.video.src = url;

			self.video.onloadeddata = function () {
				self.video.playbackRate = 1;
				self.ratio = self.video.videoWidth / self.video.videoHeight;
				self.width = width;
				self.height = self.width / self.ratio;
				self.video.muted = true;
				self.video.currentTime = self.video.duration / 2;
				self.video.play();
				self.timerCallback();
			};
		},
		computeFrame: function () {
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.canvasContext.drawImage(this.video, 0, 0, this.width, this.height);
			let self = this;
			this.canvas.toBlob(function (blob) {
				var reader = new FileReader();

				reader.onloadend = function () {
					if (!self.pauseShedule) {
						self.pauseShedule = true;
						setTimeout(() => self.video.pause(), 1000);
					}
					var base64data = reader.result;
					if (self.thumbnail) {
						if (self.thumbnail.length < base64data.length) {
							self.thumbnail = base64data;
							self.thumbnailBlob = blob;
						}
					} else {
						self.thumbnail = base64data;
						self.thumbnailBlob = blob;
					}
				};
				reader.readAsDataURL(blob);
			});
			return;
		},
	};
}
