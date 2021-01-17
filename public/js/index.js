
$(document).ready(function() {
	// delete-post
	$('#delete-btn').click(function(){
		var id = $('#id').text()
		$.ajax({
			url: '/' + id,
			method: 'DELETE',
			success: function(result){
				alert(result)
				// $(location).attr('href', '/')
				window.location.reload();
			}
		})
	})

	// update-post
	// $('#update-btn').click(function(){
	// 	var id = $('#id').text()
	// 	$.ajax({
	// 		url: '/update-post/' + id,
	// 		method: 'PUT',
	// 		data: {
	// 			id: id
	// 		},
	// 		success: function(result){
	// 			alert(result)
	// 		}
	// 	})
	// })
})
