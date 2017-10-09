var bLazy = new Blazy({
	selector: 'img'
});			

function initMap() { 
    var pos = {lat: 18.909837, lng: -99.185628};

    var map = new google.maps.Map(document.getElementById('map'), {
     	zoom: 15,
     	center: pos          
    });

	var propertieCircle = new google.maps.Circle({
            strokeColor: '#F75111',
            strokeWeight: 1,
            fillColor: '#F75111',
            fillOpacity: 0.35,
            map: map,
            center: pos,
            radius: 500
      });
 }

document.oncontextmenu = function() {
	return false
};

$(function() {
	
	var animationSpeed = 2000;
	var pause = 5000;
	var currentSlide = 1;
	var sliderInterval;
	var currentSlider;
	var $slider;

	function startSlider(){
		$slideContainer = $slider.find('.slides');
		$slides = $slideContainer.find('.slide');

		var width = $slides.find('.image-features').width();
		var slidesNumber = $slides.length
		
		$('.slide').css('width', width);
		$('.slider .slides').css('width', width * slidesNumber);

		sliderInterval = setInterval(function(){
			 $slideContainer.animate(
			 	{'margin-left':'-='+width},
			 	animationSpeed, 
			 	function() {
			 		currentSlide++;
			 		if(currentSlide === $slides.length)	{
			 			currentSlide = 1;
			 			$slideContainer.css('margin-left',0);
				 	}
		 		});
		},pause);
	}

	function pauseSlider(){
		clearInterval(sliderInterval);
	}

	$loader = $('<div class="loader">');	

	function endCleanForm(){
		$loader.remove();
		$('#body').removeClass('fondoTransparente');
		$('#buyerName').val('');
		$('#buyerMail').val('');
		$('#buyerTel').val('');
		$('#buyerComment').val('');
	}

	$('#listFeatures button').click(
		function(){
			$('#listFeatures')
				.find('button.button-active')
				.removeClass('button-active')
			$(this).addClass('button-active');

			if (jQuery.type($slider) != "undefined"){
				pauseSlider();
			}

			$("#features")
				.find('div.show')
				.removeClass('show')
				.addClass('hide');

			$newFeature = $('#feature-article')
				.find('div.' +  $(this).data("feature"));

			$newFeature.toggleClass('hide');
			$newFeature.addClass('show');

			$slider = $('#'+ $(this).data("feature") + 'Slider');

			if ($slider.length > 0){
				startSlider();
				$slider.on('mouseenter', pauseSlider).on('mouseleave', startSlider);
			} 
	});


	$('#buyerForm')
		.submit(function(ev){
			ev.preventDefault();

			$('#body').addClass('fondoTransparente');
			$loader.appendTo('body');

			$.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: 'https://mxalaventa.herokuapp.com/v1/sendEmailPages',
				data: JSON.stringify(
				{
					"origin": $('title').text(),
					"buyerName": $('#buyerName').val(),
					"buyerMail": $('#buyerMail').val(),
					"buyerTel": $('#buyerTel').val(),
					"buyerComment": $('#buyerComment').val()
				}),
				success: function(result){
					endCleanForm();
					alert('Tu solicitud fue enviado con éxito, uno de nuestros asesores se pondrá en contacto contigo lo antes posible.');
				},
				error: function(xhr,status,error) {
					endCleanForm();
					alert('No fue posible enviar tu solicitud. Puedes comunicarte con nosotos al 55 5966 4446.');
				}
			})
		})
})
