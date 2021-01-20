function handleAddComment(postId){
  $( "#"+postId ).append(`
   <div class="input-group mb-3">
      <input type="text" class="form-control" id="inputComment" placeholder="Enter comment">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="send" onclick="saveComment('${postId}')">Send</button>
      </div>
   </div>
  `
  );
}

function saveComment(postId){
  let comment_details = $('#inputComment').val()
  alert(comment_details)
  $.ajax({
    url: '/save-comment/' + postId,
    method: 'POST',
    data: {
      post_id: postId,
      comment_details: comment_details
    },
    success: function(res){
      alert(res)
      window.location.href = "/"
    }

  })
}

//delete comment
function handleDeleteComment(comment_id){
  alert(comment_id)
  $.ajax({
    url: '/delete-comment/' + comment_id,
    method: 'DELETE',
    data: {
      _id: comment_id,
    },
    success: function(res){
      alert(res)
      window.location.href = "/"
    }
  })
}
