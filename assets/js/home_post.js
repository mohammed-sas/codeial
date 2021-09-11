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

                    <div class="post-comments">
                        <form action="/comment/create" method="post">
                            <input type="text" name="content" placeholder="type here to add comment..." required>
                            <input type="hidden" name="post" value="${ post._id}">
                            <input type="submit" value="Add Comment">
                        </form>


                            <div class="post-comments-list">
                            <ul id="post-comment-${ post._id}">
                                
                                    <% for (i of post.comment) {%>
                                        <%- include('_comment') -%>
                                    <% } %>
                                

                            </ul>

                            </div>
                    </div>


                </li>
        `)
    }
    createPost();
}