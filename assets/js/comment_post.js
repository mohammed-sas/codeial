{
    let createComment = function(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function (e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url :'/comment/create',
                data : newCommentForm.serialize(),
                success : function(data){
                    console.log('inside ajax success ',data.data.comments);
                    let newComment = newCommentDom(data.data.comments);
                    $('.post-comments-list>ul').prepend(newComment);
                    deleteComment($(' .delete-comment-button',newComment));

                    // to enable toggle like button functionality in new comment
                    new ToggleLike($(' .toggle-like-button',newComment));
                },
                error : function(err){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newCommentDom = function(comment){
        return $(`
        <li id="comment-${comment._id}" >
            <p>
                 ${comment.content}
                <br>
                <small>  ${comment.user.name}</small>
            </p>
            <br>
                
                    
               
                ${comment.likes.length} Likes
               
            <br>
           
            <small><a class="delete-comment-button" href="/comment/destroy/${comment._id}">Delete Comment</a></small>
            
        </li>        
        
        `);
    }

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success:function(data){
                    console.log('inside ajax comment delete ******',data.data.comment_id);
                    $(`#comment-${data.data.comment_id}`).remove();

                },
                error : function(err){
                    console.log(error.responseText);
                }
            });
        });

    }

    createComment();
}