// JavaScript Document

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};

// inititalize Barba JS
Barba.Pjax.start();

var timer;

// swipe left on projects

$("#inner1, #info_1, #thumbs_1").on("swipeleft",function() {
	loadGridItems(2, 'left');
});

$("#inner2, #info_2, #thumbs_2").on("swipeleft",function() {
	loadGridItems(3, 'left');
});

$("#inner3, #info_3, #thumbs_3").on("swipeleft",function() {
	loadGridItems(4, 'left');
});

$("#inner4, #info_4, #thumbs_4").on("swipeleft",function() {
	loadGridItems(5, 'left');
});

// swipe right on projects

$("#inner2, #info_2").on("swiperight",function() {
	loadGridItems(1, 'right');
});

$("#inner3, #info_3").on("swiperight",function() {
	loadGridItems(2, 'right');
});

$("#inner4, #info_4").on("swiperight",function() {
	loadGridItems(3, 'right');
});

$("#inner5, #info_5").on("swiperight",function() {
	loadGridItems(4, 'right');
});

// START loadGridItems(grid, dir) function

function loadGridItems(grid, dir) {

	var currentGrid = grid;
	var ic = $('#ic_'+grid);
	var inf = $('#info_'+grid);
	var thm = $('#thumbs_'+grid);
	
	if (grid == '') {
		var currentgrid = 0;
	}
	
	if (dir == '') {
		var dir = 'left';
	}

	swapBkgdColor(grid);


	$('.projlink').each(function(index) {
		var thisIndex = (index+1);

		$(this).removeAttr("onclick");	    
		var self = this;

		setTimeout(function() {
			$(self).attr('onclick', 'loadGridItems("'+thisIndex+'")');
		}, 2400);

	});


	$(".inner-container").each(function(index) {

		var thisIndex = index;

		if (grid != thisIndex) {

			if ($(this).is(".animate-in-left") || $(this).is(".animate-in-right")) {
				
				if ($(this).is("animate-in-left")) {
					$(this).removeClass("animate-in-left");
				} else {
					$(this).removeClass("animate-in-right");
				}
				
				if (dir == 'left') {
					$(this).addClass("animate-out-left");
				} else {
					$(this).addClass("animate-out-right");
				}

				var self = this;

				setTimeout(function() {
					$(self).css('background-image', 'none');
					$(self).find('div').css('background-image', 'none');
					if (dir == 'left') {
						$(self).removeClass("animate-out-left");
					} else {
						$(self).removeClass("animate-out-right");
					}
					$(self).hide();
				}, 1200);
			}

		} 

	});


	$(".info-container").each(function(index) {

		var thisIndex = index;

		if (grid != thisIndex) {

			if ($(this).is(".animate-up")) {
				$(this).removeClass("animate-up");
				$(this).addClass("animate-down");

				var self = this;

				setTimeout(function() {
					$(self).removeClass("animate-down");
					$(self).hide();
				}, 1200);
			}

		} 

	});


	$(".thumbs").each(function(index) {

		var thisIndex = index;

		if (grid != thisIndex) {

			if ($(this).is(".move-in")) {
				$(this).removeClass("move-in");
				$(this).addClass("move-out");

				var self = this;

				setTimeout(function() {
					$(self).removeClass("move-out");
					$(self).hide();
				}, 900);
			}

		} 

	});


	if (!ic.hasClass("animate-in")) {

		// var j;

		// for (j=0; j<numItems; j++) {
			// ic.append('<div class="grid-item" id="projects_'+(j+1)+'"></div>');
		// }

			setTimeout(function() {
				ic.show();
				if (dir == 'left') {
				    ic.addClass('animate-in-left');
				} else {
					ic.addClass('animate-in-right');
				}
				loadFadeImage(grid);
			}, 800);


			setTimeout(function() {
				thm.show();
				thm.addClass('move-in');
				// setSlideshow(grid);
			}, 1200);


			setTimeout(function() {
				inf.show();
				inf.addClass('animate-up');
			}, 1600);			

	}

}


function gridImages(proj) {     

	if (proj == '') {
		var proj = 'projects_1';
	} else {
		var proj = 'projects_'+proj;
	}

	var numItems = [];

	$(".grid-item").each(function( index ) {
		numItems.push(index);
	});

	numItems.sort(function() {
		return 0.5 - Math.random();
	})

	$.each(numItems, function(k,v) {

		setTimeout(function() {
			$('#projects_'+(v+1)).css('background-image', "url('images/"+proj+"_"+(v+1)+".jpg')");
		}, k * 10)

	})

}


function loadFadeImage(proj) {	

	if ($("#ic_"+proj+" .inner-container2").hasClass('fade-in')) {
		$("#ic_"+proj+" .inner-container2").removeClass('fade-in');
		$("#ic_"+proj+" .inner-container2").css('opacity', 0)
	}

	$("#ic_"+proj).css('background-image', "url('images/large/projects_"+proj+"_1.jpg')");

	setTimeout(function() {
		$("#ic_"+proj+" .inner-container2").css('background-image', "url('images/large/projects_"+proj+"_2.jpg')");
	}, 900);

	setTimeout(function() {
		$("#ic_"+proj+" .inner-container2").addClass('fade-in');
	}, 900);

}


function swapBkgdColor(bcolor) {

	var bkcolor = bcolor;

	switch(bkcolor) {
		case '1':
			bkcolor = "#CFD7C7";
			break;
		case '2':
			bkcolor = "#b7c7ce";
			break;
		case '3':
			bkcolor = "#441400";
			break;
		case '4':
			bkcolor = "#0B2027";
			break;
		case '5':
			bkcolor = "#263346";
			break;
		default:
			bkcolor = "#0B2027";
	} 

	$( "#main" ).animate({backgroundColor: bkcolor}, 800);
	$( "#main" ).find(".project-heading-mask-bg").attr("fill", bkcolor);

}


// CHECK IF ELEMENT IS IN VIEWPORT 

var $animation_elements = $('.copy-bounce');
var $window = $(window);


function check_if_in_view() {

    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
	var $element = $(this);
	var element_height = $element.outerHeight();
	var element_top_position = $element.offset().top;
	var element_bottom_position = (element_top_position + element_height);

	//check to see if this current container is within viewport
	if (!$element.hasClass('in-view')) {
		if ((element_bottom_position >= window_top_position) &&
			(element_top_position <= window_bottom_position)) {
		  $element.addClass('in-view');
		} 
	}

  });

}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');


// preloader animation js

;(function(){
  function id(v){ 
	  return document.getElementById(v); 
  }
  function loadbar() {
	var ovrl = id("overlay"),
		prog = id("progress"),
		stat = id("progstat"),
		img = document.images,
		c = 0,
		tot = img.length;

	if (tot == 0) return doneLoading();

	function imgLoaded(){
	  c += 1;
	  var perc = ((100/tot*c) << 0) +"%";
	  prog.style.width = perc;
	  stat.innerHTML = "loading "+ perc;
	  if (c===tot) return doneLoading();
	}
	  
	function doneLoading(){
	  ovrl.style.opacity = 0;
	  setTimeout(function(){ 
		ovrl.style.display = "none";
	  }, 1200);
	  $('.ui-loader-header').css("display", "none")
	}
	for(var i=0; i<tot; i++) {
	  var tImg     = new Image();
	  tImg.onload  = imgLoaded;
	  tImg.onerror = imgLoaded;
	  tImg.src     = img[i].src;
	}    
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());


// Mobile Toggle Menu (hamburger) 
document.querySelector( "#nav-toggle" )
  .addEventListener( "click", function() {
	this.classList.toggle( "active" );
	$("#mainnavlist").fadeToggle("activenav");
});


// Get mouse position inside SVG div 

var mouseInDiv = false;

$("#about")
  .mouseenter(function() {
	mouseInDiv = true;
  })
  .mouseleave(function() {
	mouseInDiv = false;
});

var divPos = {};
var offset = $("#about").offset();
$(document).mousemove(function(e) {

	if (mouseInDiv) {
		divPos = {
			left: e.pageX - offset.left,
			top: e.pageY - offset.top
		};
		// console.log(divPos.left);
	}

});


// LOAD ITEMS WHEN SITE IS READY 

$(window).on("load", function() {

	loadGridItems('0', 'left');
	$('.background-container').addClass("expandPreloader");

});