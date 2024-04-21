document.addEventListener("DOMContentLoaded", function() {
	Barba.Pjax.init();
	Barba.Prefetch.init();
	var FadeTransition = Barba.BaseTransition.extend({
		start: function() {
			Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
		},
		fadeOut: function() {
			return $(this.oldContainer).animate({
				opacity: 0
			}, 800).promise();
		},
		fadeIn: function() {
			var _this = this;
			var $el = $(this.newContainer);
			$(this.oldContainer).hide();
			$el.css({
				visibility: 'visible',
				opacity: 0
			});
			$el.animate({
				opacity: 1
			}, 800, function() {
				_this.done();
			});
		}
	});
	Barba.Pjax.getTransition = function() {
		return FadeTransition;
	};
	Barba.Dispatcher.on('initStateChange', function(HTMLElement, MouseEvent) {
		$('#barba-wrapper').addClass('transition');
		$(".header .uMenuRoot a").click(function() {
			$(".header .uMenuRoot a").removeClass("uMenuItemA");
			$(this).addClass("uMenuItemA");
		});
	});
	Barba.Dispatcher.on('transitionCompleted', function(currentStatus) {
		$('#barba-wrapper').removeClass('transition');
	});
	Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
		var $newPageHead = $('<head />').html(
		$.parseHTML(
		newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0], document, true));
		var headTags = ["script[src*='uutils.fcg']", "meta[name='keywords']", "meta[name='description']", "meta[property^='og']", "meta[name^='twitter']", "meta[itemprop]", "link[itemprop]", "link[rel='prev']", "link[rel='next']", "link[rel='canonical']"].join(',');
		$('head').find(headTags).remove();
		$newPageHead.find(headTags).appendTo('head');
	});
});