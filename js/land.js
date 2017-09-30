var bLazy = new Blazy({
selector: 'img'
});			


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
