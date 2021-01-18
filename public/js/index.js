
// delete post
function handleDeletePost(value){
	var id_post = value
	$.ajax({
		url: '/delete-post/' + id_post,
		method: 'DELETE',
		data: {
			id_post: id_post
		},
		success: function(res){
			alert(res)
			location.reload()
		}
	})
}

// add post
var arr_link = []
var result_link = []
// get image link in post
function getImageLink(){
		let image_link = $('#image_link').val().trim()
		arr_link.push(image_link)
		for(let i= 0; i<arr_link.length; i++){
			if(result_link.indexOf(arr_link[i]) === -1){
				result_link.push(arr_link[i])
				$('#main-list').append(`
					<tr>
								<td id="image_link"> ${arr_link[i]}
								</td>
								<td> <button type="button" class="btn btn-secondary" id="delete_link">Delete</button> </td>
					</tr>`
				)
			}
		}
}


// // save post
function savePost(){
  let post_content = $('#post_content').val()
	let image_links = arr_link
	$.ajax({
		url: '/add-post',
		method: 'POST',
		data: {
			post_content: post_content,
			image_links: image_links
		},
		success: function(res){
			alert(res)
			window.location.href = "/"
		}
	})
}
