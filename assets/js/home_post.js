{
    // method to submit the form data using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    // to enable toggle like functionality in new post
                    new ToggleLike($(' .toggle-like-button',newPost));

                    console.log(data);
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            })
        });
    }

    // create a post in DOM
    let newPostDom = function (post) {
        return $(`
                 <li id="post-${post._id}">        
                    <small><a class="delete-post-button" href="/post/destroy/${post._id}">Delete Post</a></small>
                    ${ post.content}
                    <br>
                    ${post.user.name}
                    <br>
                    ${post.createdAt}
                    <br>
                    <br>
                    <small>
                        <a class="toggle-like-button" data-likes="0" href="/like/toggle/?id=${post._id}&type=Post">
                        0 likes
                        </a>
                    </small>
                   

                    <div class="post-comments">
                        <form id="new-comment-form" action="/comment/create" method="post">
                            <input type="text" name="content" placeholder="type here to add comment..." required>
                            <input type="hidden" name="post" value="${ post._id}">
                            <input type="submit" value="Add Comment">
                        </form>


                            <div class="post-comments-list">
                                <ul id="post-comment-${ post._id}">
                                    
                                       
                                            
                                        
                                    

                                </ul>

                            </div>
                    </div>


                </li>
        `)
    }

// method to delete a post from the dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        });
    }
    createPost();
}