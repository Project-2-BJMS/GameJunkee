const createPost = async (event) => {
    event.preventDefault();

    const post_body = document.querySelector('#post-body').value.trim();
    const game_id = window.location.toString().split('/').at(-1)

    if (post_body) {
        // if (event.target.hasAttribute('data-id')) {
            // const game_id = event.target.getAttribute('data-id')
            console.log(game_id)
        const response = await fetch(`/api/posts/${game_id}`, {
            method: 'POST',
            body: JSON.stringify({ post_body }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.ok) {
            document.location.replace('/profile-posts')
        } else {
            alert(response.statusText)
        }
    }
    }
// }

const deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        console.log(id)

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText)
        }
    }
};




document
    .querySelector('.create-post')
    .addEventListener('submit', createPost)
// const postCreate = document.querySelector('.create-post')
// postCreate.addEventListener('submit', createPost)

document
    .querySelector('.delete-post')
    .addEventListener('click', deletePost)


