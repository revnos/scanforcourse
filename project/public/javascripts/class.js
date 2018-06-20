'use strict';

$(function() {
	var tbodys = $('tbody');
	for (var i = 0; i < tbodys.length; i++) {
		(function(i) {
			$.get('/hw/class/submits', {
					classid: $(tbodys[i]).attr('classid'),
					date: $(tbodys[i]).attr('date')
				})
				.done(function(data, status) {
					if (status === 'success') {
						data.forEach(function(val) {
							$(tbodys[i]).append("<tr><td><a href='/hw/class/download?filename=" + val.filename +
								"'><span>" + val.originalFilename + "</span></a></td><td>" + val.fileDate +
								"</td><td>" + val.score + "</td></tr>");
						});
					}
				})
				.fail(function() {
					notify("服务器走丢了");
				});
		})(i);
	}

	(function($) {
		$.fn.extend({
			notify: function(msg, options) {
				var defaluts = {
					position: 'absolute',
					top: '0',
					right: '10px',
					backgroundColor: '#218D69',
					color: 'white',
					padding: '10px',
					boxShadow: '0px 2px 10px #333333',
					opacity: 0,
					duration: 300,
					easing: 'linear',
					delay: 2000
				}
				var settings = $.extend({}, defaluts, options);
				var template = $('<div></div>');
				template.text(msg);
				template.css(settings);
				template.animate({
					opacity: 1,
					top: "+=10"
				}, settings.duration, settings.easing, function() {
					setTimeout(function() {
						template.animate({
							opacity: 0,
							top: "-=10"
						}, settings.duration, settings.easing, function() {
							template.remove();
						});
					}, settings.delay);
				});
				this.append(template);

				return this;
			}
		});
	})(window.jQuery);

	function notify(msg) {
		$('body').notify(msg, {});
	}
});