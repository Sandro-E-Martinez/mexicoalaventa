var bLazy = new Blazy({
selector: 'img'
});			


$(function() {

	$('#buyerForm')
		.submit(function(ev){
			ev.preventDefault();

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
					alert('mensaje enviado OK!!! ' + result);
				},
				error: function(xhr,status,error) {
					alert('ups!! algo salió mal: '+ error);
				}
			})
		})
})
