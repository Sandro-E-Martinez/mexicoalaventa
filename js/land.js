var bLazy = new Blazy({
selector: 'img'
});			


function initMap() {
    var pos = {lat: 19.243352, lng: -99.165322};

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


$(function() {

	$loader = $('<div class="loader">');	

	function endCleanForm(){
		$loader.remove();
		$('#body').removeClass('fondoTransparente');
		$('#buyerName').val('');
		$('#buyerMail').val('');
		$('#buyerTel').val('');
		$('#buyerComment').val('');
	}

	$('#listFeatures button').click(function(){
		$('#listFeatures')
			.find('button.button-active')
			.removeClass('button-active')
		$(this).addClass('button-active');

		$("#features")
			.find('div.show')
			.removeClass('show')
			.addClass('hide');

		$newFeature = 	$('#feature-article')
			.find('div.' +  $(this).data("feature"));

		$newFeature.toggleClass('hide');
		$newFeature.addClass('show');
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
