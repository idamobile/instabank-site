
var calcPer = 'year';
var created = false;
var cardsVisible = false;
var anim4 = false;

$(document).ready(function() {
	if(isMobile.hasTouch()){
		$('#preloader').hide(0);
		$(".percent-box .num").text('10');
		$('body').addClass('touch');
	}
	else{
		if($(window).width() > 790 && $(window).height() > 600){
			$(".percent-box .num").text('0');		
			$("#card1, #card2").fadeOut(0);
		} else {
			$(".percent-box .num").text('10');		
			$("#card1, #card2").fadeIn(0);
		}
	}

	Tabs();
	Range();
	
	if($(".flip-container").length) {
		var oldFlip = null,
		flipping = false;
		$(".flip-container .close").on("click", function(e) {
			e.preventDefault();
		})
		$(".card-container").click(function(){
			if(!flipping){
				var $card = $(this);
				$(this).flip({
					direction: "lr",
					alwaysOneDirection: false,
					onflipping: function(dir, transDir) {					
						flipping = true;
						$(".flipped-lr").flip({
							direction: "lr",
							alwaysOneDirection: false
						})
					},
					onflipped: function(dir, transDir) {					
						flipping = false;
					}
				});
			}
		})
		
		/*$(".flip-container").bind("click",function(){
			var $elem = $(this);
		
			$elem.flip({
				direction: "lr",
				alwaysOneDirection: false
			});
		
			if(oldFlip && oldFlip.data('flipped')){
				oldFlip.revertFlip();
				oldFlip.data('flipped',false);
				oldFlip.removeClass('flipped')
				oldFlip = elem;
			}

			if(elem.data('flipped')) {
				elem.revertFlip();
				elem.data('flipped',false)
				elem.removeClass('flipped')
				oldFlip = null;
			} else {
				oldFlip = elem;
				elem.flip({
					direction:'lr',
					speed: 250,
					onBefore: function(){
						elem.html(elem.siblings('.back').html());
						elem.addClass('flipped')
						$(".flip-container .close").on("click", function(e) {
							e.preventDefault();
							var elem = $(this).parent();
							if(elem.data('flipped')) {
								elem.revertFlip();
								elem.data('flipped',false);
								elem.removeClass('flipped')
								oldFlip = null;
							}
							
							return false;
						});
					}
				});
				elem.data('flipped',true);
			}
		});*/
	}

	
	$(".scrollto").click(function() {
		if(!created) {
			$('html, body').animate({
			 scrollTop: $($(this).attr('href')).offset().top
			}, 600);
		} else {
			var page_id = $(this).data('page-id');
			if(created) {
				$.fn.fullpage.moveTo(page_id)
			}
		}
		return false;
    });
	
	if(!isMobile.hasTouch()){
		$('.home-page .logo a').click(function(){
			if(created) {
				$.fn.fullpage.moveTo(1);
			}
			$('#home-video')[0].play();
			return false;
		});
	}
	
	$('.btn-next').click(function(){
		var i_ = $(this).closest('.section').index();
		if(created) {
			$.fn.fullpage.moveTo(i_ + 2);
		}
		return false;
	});
	$(".btn-download-app").fancybox({
		wrapCSS : 'lightbox-download',
		'scrolling': 'no',
		helpers: {
			overlay: {locked: false}
		}
	});
	$(".btn-completion, .btn-balance").fancybox({
		wrapCSS : 'lightbox-info',
		helpers: {
			overlay: {locked: true}
		},
		beforeShow: function(){
			if(created) {
				$.fn.fullpage.setAllowScrolling(false);
			}
		}, 
		beforeClose: function(){
			if(created) {
				$.fn.fullpage.setAllowScrolling(true);
			}
		}
	});
	$(".item03 .note a").click(function(){
		$(this).hide();
		$(".item03 .note a."+calcPer).show()
		$(".item03 .calcPer_"+calcPer).hide()
		
		calcPer = $(this).attr('class');
		$(".item03 .calcPer_"+calcPer).show()
		
		if(calcPer == 'year'){
			$( "#summery" ).html( withspaces( ( $("#slider-range-max").slider( "value" ) * 0.1 ) ));
		} else {
			$( "#summery" ).html( withspaces( ( Math.round($("#slider-range-max").slider( "value" ) * 0.1 / 12 )) ));
		}
		
		return false;
	})
	
	setTimeout(function(){ $('#preloader').fadeOut(1000); }, 500);
}); 

$(window).on('load', function(){
	if($('.info-lst').length){
		var $container = $('.info-lst');
		// init
		$container.isotope({
		// options
			itemSelector: '.item',
			layoutMode: 'fitRows'
		});
		
		var $optionSets = $('.top-nav-area ul'),
		$optionLinks = $optionSets.find('a');
		
		$optionLinks.click(function(){
		var $this = $(this);
		
		if($this.hasClass('active')){
			return false;
		}
		var $optionSet = $this.parents('.top-nav-area ul');
		$optionSet.find('.active').removeClass('active');
		$this.addClass('active');
		
		var options = {},
			key = $optionSet.attr('data-option-key'),
			value = $this.attr('data-option-value');
			value = value === 'false' ? false : value;
			options[ key ] = value;
		if(key === 'layoutMode' && typeof changeLayoutMode === 'function'){
			changeLayoutMode( $this, options )
		}
		else{$container.isotope( options );}
		
		return false;
		});
	}
	
	var isBrowserOs = {
	    Windows: function() {
	        return navigator.userAgent.match(/Win/i);
	    },
	    MacOS: function() {
	        return navigator.userAgent.match(/Mac/i);
	    },
	    UNIX: function() {
	        return navigator.userAgent.match(/X11/i);
	    },
	    Linux: function() {
	        return navigator.userAgent.match(/Linux/i);
	    },
	    iOs: function() {
	        return navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
	    },
	    Android: function() {
	        return navigator.userAgent.match(/android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    Chrome: function() {
	        return window.chrome;
	    },
	    Firefox: function() {
	        return navigator.userAgent.match(/Firefox/i);
	    },
	    IE: function() {
	        return navigator.userAgent.match(/MSIE/i);
	    },
	    Opera: function() {
	        return (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
	    },
	    SeaMonkey: function() {
	        return navigator.userAgent.match(/SeaMonkey/i);
	    },
	    Camino: function() {
	        return navigator.userAgent.match(/Camino/i);
	    },
	    Safari: function() {
	        return (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0);
	    }
	};
	 
	var html_class = '';
	//OS
	if(isBrowserOs.Windows())
		html_class = 'win';
	if(isBrowserOs.UNIX())
		html_class = 'unix';
	if(isBrowserOs.MacOS())
		html_class = 'mac';
	if(isBrowserOs.Linux())
		html_class = 'linux';
	if(isBrowserOs.iOs())
		html_class = 'ios';
	if(isBrowserOs.Android())
		html_class = 'android';
	if(isBrowserOs.BlackBerry())
		html_class = 'blackberry';
	 
	//Browser
	if(isBrowserOs.Chrome())
		html_class = html_class + ' chrome';
	if(isBrowserOs.Firefox())
		html_class = html_class + ' firefox';
	if(isBrowserOs.IE())
		html_class = html_class + ' ie';
	if(isBrowserOs.Opera())
		html_class = html_class + ' opera';
	if(isBrowserOs.SeaMonkey())
		html_class = html_class + ' seamonkey';
	if(isBrowserOs.Camino())
		html_class = html_class + ' camino';
	if(isBrowserOs.Safari())
		html_class = html_class + ' safari';
	
	if(!isMobile.hasTouch()){
		html_class = html_class + ' not_is_touch';
	}else{
		html_class = html_class + ' is_touch';
	}
	 
	$("html").addClass(html_class);
});

$(window).on('load resize', function(){

	if(isMobile.hasTouch()) {
	    $('#home-video').remove();
	    $('.section.item01').addClass('bg');	    
	}else{
		$('#home-video').show(0);
		if($(window).width() > 790 && $(window).height() > 600){
			$(".percent-box .num").text('0');		
			$("#card1, #card2").fadeOut(0);
		} else {
			$(".percent-box .num").text('10');		
			$("#card1, #card2").fadeIn(0);
		}
	}
	Home();
	ScrollH();
	if($(window).width() < 490 && $("#slider-range-max").length){
		var canvas = document.getElementById("counter");
		var ctx = canvas.getContext("2d");
		ctx.lineWidth = 10;
		ctx.imageSmoothingEnabled = true;
	
		function draw(angle) {
			ctx.clearRect(0, 0, 430, 430);
	
			ctx.beginPath();
			ctx.strokeStyle = '#4299a0';
			ctx.arc(230, 230, 225, 0, 2*Math.PI);
			ctx.stroke();
	
			ctx.beginPath();
			ctx.strokeStyle = '#ffbc12';
			ctx.arc(230, 230, 225, -Math.PI/2, angle);
			ctx.stroke();
		}
	
		draw( -Math.PI/2 + 0.3 );
	
	
		$( "#slider-range-max" ).slider({
			range: "max",
			min: 20000,
			max: 2000000,
			step: 5000,
			value: 100000,
			slide: function( event, ui ) {
				$( "#amount" ).html( withspaces( ui.value ) + " <span>p</span>" );
				if(calcPer == 'year'){
					$( "#summery" ).html( withspaces( ( ui.value * 0.1 ) ));
				} else {
					$( "#summery" ).html( withspaces( ( Math.round(ui.value * 0.1 / 12) ) ));
				}
				
	
				var canvas = document.getElementById("counter");
				var ctx = canvas.getContext("2d");
				ctx.lineWidth = 10;
	
				function draw(angle) {
					ctx.clearRect(0, 0, 400, 400);
					ctx.beginPath();
					ctx.strokeStyle = '#4299a0';
					ctx.arc(230, 230, 225, 0, 2*Math.PI);
					ctx.stroke();
	
					ctx.beginPath();
					ctx.strokeStyle = '#ffbc12';
					ctx.arc(230, 230, 225, -Math.PI/2, angle);
					ctx.stroke();
				}
	
				draw( -Math.PI/2 + ( ui.value / 318000 ) );
			}
		});
	}
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	
	if($(".flip-container").length){
		var cardH = $(".flip-container").height()
		$(".flip-container .txt-box").css({"margin-top":"-"+cardH+"px"});
	}
	
});


function ScrollH(){
	var top_g = $('#main').offset().top;
	var t_h = $('.top-nav-area').outerHeight();
	$(window).scroll(function(){
		var top_ = $(this).scrollTop();
		if(top_ > top_g && $(window).width() > 790){
			$('.top-nav-area').addClass('fixed');
			$('#main').css('paddingTop', t_h)
		}
		else{
			$('#main').css('paddingTop', '0')
			$('.top-nav-area').removeClass('fixed');
		}
	});
}

function Home(){
	if($('.home-page #main').length && !isMobile.hasTouch()){
		
		if($(window).width() > 790 && $(window).height() > 600){
			if(!created) {
				$('.home-page #main').fullpage({
					scrollingSpeed: 500,
					navigation: true,
					afterLoad: function(anchorLink, index){
						$("#card1, #card2").fadeOut(0);
						$(".percent-box .num").text('0');
						
						if(index == '4' || index == '5' || index == '6' || index == '8'){
							$('header').addClass('black');
							$('#fp-nav').addClass('black');
						}else{
							$('header').removeClass('black');
							$('#fp-nav').removeClass('black');
						}
						if(index == '2'){
							rotateCards();
						} else if(index == '3'){
							animate4();
						}
					},
					afterRender: function(){
						$('#home-video')[0].play();
					}
				});		
				created = true;
			}
			
		}
		else{			
			if(created) {
				$.fn.fullpage.destroy('all');
				created = false;
				$('header').removeClass('black');
			}
		}
		
		if(!isMobile.hasTouch()) {
			$(".section .btn-next").hover(function(){
				animateArrow($(this))
			}, function(){
				$(this).stop().css('background-position', '50% 50%');
			})
		}
		
		function animateArrow($b){
			var pos = $b.css('background-position').split(" ");
			pos = parseInt(pos[1])
			if(pos > 0) {
				$b.css('border-spacing', pos).animate({
					'border-spacing': 0
				}, {
					step: function(now, fx) {
													
						$(fx.elem).css("background-position", "50% "+now+"%");
					},
					duration: 400,
					complete: function(){animateArrow($b)}
				});
			} else {
				$b.css('border-spacing', pos).animate({
					'border-spacing': 100
				}, {
					step: function(now, fx) {
						$(fx.elem).css("background-position", "50% "+now+"%");
					},
					duration: 400,
					complete: function(){animateArrow($b)}
				});
			}
		}
	}
}

function equalHeight(group) {
     var tallest = 0;
     group.each(function() {
          var thisHeight = $(this).attr("style", "").height();
          if(thisHeight > tallest) {
               tallest = thisHeight;
          }
     });
     group.height(tallest);
} 

function animate4(){
	if($(".percent-box .num").text() != '10') {
		$(".percent-box .num").text(parseInt($(".percent-box .num").text())+1);
		setTimeout(function(){animate4()}, 100);
	}
	
	
}
function rotateCards(){	
	if(!isMobile.hasTouch()) {
		$("#card2").animateRotate(45, 0, 400, "linear").fadeIn(400, function(){
			$("#card1").animateRotate(25, 0, 200, "linear").fadeIn(400, function(){
			})
		})
	}
}

$.fn.animateRotate = function(start, angle, duration, easing, complete) {
    return this.each(function() {
        var $elem = $(this);
        $({deg: start}).animate({deg: angle}, {
            duration: duration,
            easing: easing,
            step: function(now) {
                $elem.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};

function Tabs(){
	$('.tab-nav a').click(function(){
		if (!$(this).parent().hasClass('active')){
			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active');
			var id_ = $(this).attr('href');
			$(id_).siblings().hide();
			$(id_).stop(true, true).fadeToggle(500);
		}
		return false;
	});
}

function Range(){
	if($("#slider-range-max").length){
		var canvas = document.getElementById("counter");
		var ctx = canvas.getContext("2d");
		ctx.lineWidth = 10;
		ctx.imageSmoothingEnabled = true;
	
		function draw(angle) {
			ctx.clearRect(0, 0, 430, 430);
	
			ctx.beginPath();
			ctx.strokeStyle = '#4299a0';
			ctx.arc(227, 227, 215, 0, 2*Math.PI);
			ctx.stroke();
	
			ctx.beginPath();
			ctx.strokeStyle = '#ffbc12';
			ctx.arc(227, 227, 215, -Math.PI/2, angle);
			ctx.stroke();
		}
	
		draw( -Math.PI/2 + 0.3 );
		
		$( "#slider-range-max" ).slider({
			range: "max",
			min: 20000,
			max: 2000000,
			step: 5000,
			value: 100000,
			slide: function( event, ui ) {
				$( "#amount" ).html( withspaces( ui.value ) + " <span>p</span>" );
				if(calcPer == 'year'){
					$( "#summery" ).html( withspaces( ( ui.value * 0.1 ) ));
				} else {
					$( "#summery" ).html( withspaces( ( Math.round(ui.value * 0.1 / 12 )) ));
				}				
	
				var canvas = document.getElementById("counter");
				var ctx = canvas.getContext("2d");
				ctx.lineWidth = 10;
	
				function draw(angle) {
					ctx.fillStyle="#4299a0";			
					ctx.clearRect(0, 0, 500, 500);

					ctx.beginPath();
					ctx.strokeStyle = '#ffbc12';
					ctx.arc(227, 227, 215, -Math.PI/2, angle);
					ctx.stroke();					
				}
	
				draw( -Math.PI/2 + ( ui.value / 318000 ) );
			}
		});
		$( "#amount" ).html( withspaces( $( "#slider-range-max" ).slider( "value" ) ) + " <span>p</span>" );
		if(calcPer == 'year'){
			$( "#summery" ).html( withspaces( ( $("#slider-range-max").slider( "value" ) * 0.1 ) ));
		} else {
			$( "#summery" ).html( withspaces( ( Math.round($("#slider-range-max").slider( "value" ) * 0.1 / 12 )) ));
		}		
	}
}

function withspaces(n) {
	n += "";
	n = new Array(4 - n.length % 3).join("U") + n;
	return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}

function infp_list_flip_height(){
	$( ".info-lst li" ).each(function( index ) {
		var h = $(this).find('.img').outerHeight() + $(this).find('.txt-box').outerHeight();
		$(this).find('.flip-container').height(h);
//		$(this).find('.flipper .front').height(h);
//		$(this).find('.flipper .back').height(h);
	});
}

var isMobile = {
    hasTouch: function() {
        return 'ontouchstart' in document.documentElement;
    },
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    },
    ismobi: function() {
        return navigator.userAgent.match(/Mobi/i);
    }
};