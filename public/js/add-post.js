$(document).ready(() => {
      var arr_link = []
      // add link
			$('#add_link').click(() => {
        let image_link = $('#image_link').val()
        $('#main-list').append(`
          <tr>
                <td id="image_link"> ${image_link}
                </td>
                <td> <button type="button" class="btn btn-secondary" id="delete_link">Delete</button> </td>
          </tr>`
        )
        arr_link.push(image_link)
			});

      // save post
      $('#save_post').click(() => {
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
      })

      // delete link
      $('table').on('click','#delete_link', function(){
        let row = $(this).closest('tr')
        let image_link =  row.find('#image_link').text()
        image_link = image_link.trim()
        // let image_link =  "123"
        for(let i=0; i< arr_link.length; i++){
          if(arr_link[i] === image_link){
            arr_link.splice(i, 1);
            $(this).closest("tr").remove()
          }
        }
  	  })
});
