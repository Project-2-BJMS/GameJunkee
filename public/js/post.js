const deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        console.log(id)

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
};




document
    .querySelectorAll('.delete-post')
    .forEach(btn => btn.addEventListener('click', deletePost))