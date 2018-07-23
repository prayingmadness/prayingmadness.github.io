( function( $ ) {
	// Responsive videos
	var $all_videos = $( '.entry-content' ).find( 'iframe[src*="player.vimeo.com"], iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"], iframe[src*="dailymotion.com"],iframe[src*="kickstarter.com"][src*="video.html"], object, embed' ),
		$container = $( '.sticky-container' );

	$all_videos.not( 'object object' ).each( function() {
		var $video = $(this);

		if ( $video.parents( 'object' ).length )
			return;

		if ( ! $video.prop( 'id' ) )
			$video.attr( 'id', 'rvw' + Math.floor( Math.random() * 999999 ) );

		$video
			.wrap( '<div class="responsive-video-wrapper" style="padding-top: ' + ( $video.attr( 'height' ) / $video.attr( 'width' ) * 100 ) + '%" />' )
			.removeAttr( 'height' )
			.removeAttr( 'width' );
	} );

	$( 'a[href="#"]' ).click( function(e) {
		e.preventDefault();
	} );

	// Shortcode
	if ( theme_js_vars.carousel ) {
		if ( theme_js_vars.autoplay ) {
			var interval = theme_js_vars.interval * 1000;
			$( '.carousel' ).carousel( {
				pause: 'hover',
				interval: interval
			} );
		} else {
			$( '.carousel' ).carousel( 'pause' );
		}
	}

	if ( theme_js_vars.tooltip )
		$( 'a[rel="tooltip"]' ).tooltip();

	if ( theme_js_vars.tabs ) {
		$( '.nav-tabs a' ).click( function(e) {
			e.preventDefault();
			$(this).tab( 'show' );
		} );
	}

	// Masonry for home page
	if ( 0 != $container.length ) {
		$(window).load(function() {
			$container.imagesLoaded( function(){
		        $container.masonry( {
		            itemSelector: '.item',
		            stamp: '.stamp'
		        } ).css( 'visibility', 'visible' );
		    } );
		} );

		$( document.body ).on( 'post-load', function () {
			$container.imagesLoaded( function() {
				$container
					.masonry( 'reloadItems' )
					.masonry( 'layout' );
			} );
		} );
	}
} )( jQuery );