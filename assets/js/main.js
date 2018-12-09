/* ===================================================================
 * Abstract - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  const cfg = {
    defAnimation: 'fadeInUp', // default css animation
    scrollDuration: 800, // smoothscroll duration
    statsDuration: 4000, // stats animation duration
    mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc',
  };


  const $WIN = $(window);


  /* Preloader
	 * -------------------------------------------------- */
  const ssPreloader = function () {
    $WIN.on('load', () => {
	      // will first fade out the loading animation
	    	$('#loader').fadeOut('slow', () => {
	        // will fade out the whole DIV that covers the website.
	        $('#preloader').delay(300).fadeOut('slow');
	      });
	  	});
  };


  /* audio controls
	 * -------------------------------------------------- */
  const ssMediaElementPlayer = function () {
    $('audio').mediaelementplayer({
      features: ['playpause', 'progress', 'tracks', 'volume'],
	  	});
  };


  /* FitVids
	------------------------------------------------------ */
  const ssFitVids = function () {
    $('.fluid-video-wrapper').fitVids();
  };


  /* pretty print
	 * -------------------------------------------------- */
  const ssPrettyPrint = function () {
    $('pre').addClass('prettyprint');
    $(document).ready(() => {
	    	prettyPrint();
	  	});
  };


  /* Alert Boxes
  	------------------------------------------------------- */
  	const ssAlertBoxes = function () {
  		$('.alert-box').on('click', '.close', function () {
		  $(this).parent().fadeOut(500);
    });
  	};


  /* superfish
	 * -------------------------------------------------- */
  const ssSuperFish = function () {
    $('ul.sf-menu').superfish({

	   	animation: { height: 'show' }, // slide-down effect without fade-in
      animationOut: { height: 'hide' }, // slide-up effect without fade-in
      cssArrows: false, // disable css arrows
      delay: 600, // .6 second delay on mouseout

    });
  };


  	/* Mobile Menu
   ------------------------------------------------------ */
  const ssMobileNav = function () {
   	const toggleButton = $('.menu-toggle');


    const nav = $('.main-navigation');

	   toggleButton.on('click', (event) => {
      event.preventDefault();

      toggleButton.toggleClass('is-clicked');
      nav.slideToggle();
    });

	  	if (toggleButton.is(':visible')) nav.addClass('mobile');

	  	$WIN.resize(() => {
	   	if (toggleButton.is(':visible')) nav.addClass('mobile');
	    	else nav.removeClass('mobile');
	  	});

	  	$('#main-nav-wrap li a').on('click', () => {
	   	if (nav.hasClass('mobile')) {
	   		toggleButton.toggleClass('is-clicked');
	   		nav.fadeOut();
	   	}
	  	});
  };


  /* search
   ------------------------------------------------------ */
  const ssSearch = function () {
   	const searchWrap = $('.search-wrap');
	   const searchField = searchWrap.find('.search-field');
	   const closeSearch = $('#close-search');
	   const searchTrigger = $('.search-trigger');
	   const body = $('body');

	   searchTrigger.on('click', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      const $this = $(this);

	      body.addClass('search-visible');
	      setTimeout(() => {
	         $('.search-wrap').find('.search-field').focus();
	      }, 100);
	   });


	   closeSearch.on('click', function () {
	      const $this = $(this);

	      if (body.hasClass('search-visible')) {
	         body.removeClass('search-visible');
	         setTimeout(() => {
	            $('.search-wrap').find('.search-field').blur();
	         }, 100);
	      }
	   });

	   searchWrap.on('click', (e) => {
	   	if (!$(e.target).is('.search-field')) {
	   		closeSearch.trigger('click');
	   	}
	   });

	   searchField.on('click', (e) => {
	      e.stopPropagation();
	   });

	   searchField.attr({ placeholder: 'Type Your Keywords', autocomplete: 'off' });
  };


  /*	Masonry
	------------------------------------------------------ */
  const ssMasonryFolio = function () {
    const containerBricks = $('.bricks-wrapper');

    containerBricks.imagesLoaded(() => {
      containerBricks.masonry({
			  	itemSelector: '.entry',
			  	columnWidth: '.grid-sizer',
	  			percentPosition: true,
			  	resize: true,
      });
    });
  };


  /* animate bricks
	* ------------------------------------------------------ */
  const ssBricksAnimate = function () {
    const animateEl = $('.animate-this');

    $WIN.on('load', () => {
      setTimeout(() => {
        animateEl.each(function (ctr) {
          const el = $(this);

          setTimeout(() => {
            el.addClass('animated fadeInUp');
          }, ctr * 200);
        });
      }, 200);
    });

    $WIN.on('resize', () => {
      // remove animation classes
      animateEl.removeClass('animate-this animated fadeInUp');
    });
  };


  /* Flex Slider
	* ------------------------------------------------------ */
  const ssFlexSlider = function () {
    $WIN.on('load', () => {
		   $('#featured-post-slider').flexslider({
        namespace: 'flex-',
		      controlsContainer: '', // ".flex-content",
		      animation: 'fade',
		      controlNav: false,
		      directionNav: true,
		      smoothHeight: false,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,
		   });

		   $('.post-slider').flexslider({
		   	namespace: 'flex-',
		      controlsContainer: '',
		      animation: 'fade',
		      controlNav: true,
		      directionNav: false,
		      smoothHeight: false,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,
		      start(slider) {
          if (typeof slider.container === 'object') {
            slider.container.on('click', (e) => {
              if (!slider.animating) {
                slider.flexAnimate(slider.getTarget('next'));
              }
            });
          }

          $('.bricks-wrapper').masonry('layout');
        },
		   });
	   });
  };


  /* Smooth Scrolling
	* ------------------------------------------------------ */
  const ssSmoothScroll = function () {
    $('.smoothscroll').on('click', function (e) {
      const target = this.hash;


      const $target = $(target);

		 	e.preventDefault();
		 	e.stopPropagation();

	    	$('html, body').stop().animate({
	       	scrollTop: $target.offset().top,
	      }, cfg.scrollDuration, 'swing').promise()
        .done(() => {
	      	// check if menu is open
	      	if ($('body').hasClass('menu-is-open')) {
            $('#header-menu-trigger').trigger('click');
          }

	      	window.location.hash = target;
	      });
	  	});
  };


  /* Placeholder Plugin Settings
	* ------------------------------------------------------ */
  const ssPlaceholder = function () {
    $('input, textarea, select').placeholder();
  };


  /* AjaxChimp
	* ------------------------------------------------------ */
  const ssAjaxChimp = function () {
    $('#mc-form').ajaxChimp({
      language: 'es',
		   url: cfg.mailChimpURL,
    });

    // Mailchimp translation
    //
    //  Defaults:
    //	 'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.es = {
		  submit: 'Submitting...',
		  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
		  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
		  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  5: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    };
  };


  /* Back to Top
	* ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 500;
    // height on which the button will show

    const fadeInTime = 400;
    // how slow/fast you want the button to show

    const fadeOutTime = 400;
    // how slow/fast you want the button to hide

    const scrollSpeed = 300;
    // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

    const goTopButton = $('#go-top');

    // Show or hide the sticky footer button
    $(window).on('scroll', () => {
      if ($(window).scrollTop() >= pxShow) {
        goTopButton.fadeIn(fadeInTime);
      } else {
        goTopButton.fadeOut(fadeOutTime);
      }
    });
  };


  /* Map
	* ------------------------------------------------------ */
  const ssGoogleMap = function () {
    if (typeof google === 'object' && typeof google.maps === 'object') {
      const latitude = 14.549072;


      const longitude = 121.046958;


      const map_zoom = 15;


      const main_color = '#d8ac00';


      const saturation_value = -30;


      const brightness_value = 5;


      let marker_url = null;


      const winWidth = $(window).width();

		   // show controls
		   $('#map-zoom-in, #map-zoom-out').show();

		   // marker url
      if (winWidth > 480) {
        marker_url = 'images/icon-location@2x.png';
		   } else {
		      marker_url = 'images/icon-location.png';
		   }

      // map style
      const style = [
        {
          // set saturation for the labels on the map
          elementType: 'labels',
          stylers: [
            { saturation: saturation_value },
          ],
        },
			   {	// poi stands for point of interest - don't show these lables on the map
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            { visibility: 'off' },
          ],
        },
        {
          // don't show highways lables on the map
			      featureType: 'road.highway',
			      elementType: 'labels',
			      stylers: [
			         { visibility: 'off' },
			      ],
			   },
        {
          // don't show local road lables on the map
          featureType: 'road.local',
          elementType: 'labels.icon',
          stylers: [
            { visibility: 'off' },
          ],
        },
        {
          // don't show arterial road lables on the map
          featureType: 'road.arterial',
          elementType: 'labels.icon',
          stylers: [
            { visibility: 'off' },
          ],
        },
        {
          // don't show road lables on the map
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            { visibility: 'off' },
          ],
        },
        // style different elements on the map
        {
          featureType: 'transit',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'poi.government',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'poi.sport_complex',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'poi.attraction',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'poi.business',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'landscape',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],

        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            { hue: main_color },
            { visibility: 'on' },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
      ];

      // map options
      const map_options = {

		      	center: new google.maps.LatLng(latitude, longitude),
		      	zoom: 15,
		      	panControl: false,
		      	zoomControl: false,
		        	mapTypeControl: false,
		      	streetViewControl: false,
		      	mapTypeId: google.maps.MapTypeId.ROADMAP,
		      	scrollwheel: false,
		      	styles: style,

		    	};

		   // inizialize the map
      const map = new google.maps.Map(document.getElementById('map-container'), map_options);

      // add a custom marker to the map
      const marker = new google.maps.Marker({

				 	position: new google.maps.LatLng(latitude, longitude),
				 	map,
				 	visible: true,
				 	icon: marker_url,

      });

      // add custom buttons for the zoom-in/zoom-out on the map
      function CustomZoomControl(controlDiv, map) {
        // grap the zoom elements from the DOM and insert them in the map
			 	const controlUIzoomIn = document.getElementById('map-zoom-in');


        const controlUIzoomOut = document.getElementById('map-zoom-out');

        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', () => {
          map.setZoom(map.getZoom() + 1);
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', () => {
          map.setZoom(map.getZoom() - 1);
        });
      }

      const zoomControlDiv = document.createElement('div');
      const zoomControl = new CustomZoomControl(zoomControlDiv, map);

      // insert the zoom div on the top right of the map
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);
    }
  };


  /* Initialize
	* ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMediaElementPlayer();
    ssFitVids();
    ssPrettyPrint();
    ssAlertBoxes();
    ssSuperFish();
    ssMobileNav();
    ssSearch();
    ssMasonryFolio();
    ssBricksAnimate();
    ssFlexSlider();
    ssSmoothScroll();
    ssPlaceholder();
    ssAjaxChimp();
    ssBackToTop();
    ssGoogleMap();
  }());
}(jQuery));
