const submitButton = document.querySelector('.create-comment')
 

const createComment = async (event) => {
    event.preventDefault()
    const post_id = window.location.toString().split('/').at(-1)
    const comment_body = document.querySelector('#comment-input').value.trim()
    // console.log(comment_body)
    const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({comment_body, post_id}),
            headers:  { 'Content-Type': 'application/json' }
})
    if (response.ok) {
        document.location.reload()
    } else {
        alert(response.statusText)
    }

}

submitButton.addEventListener('submit', createComment)



// const handleAddComment = (event) => {
//     event.preventDefault()
//     // console.log('this button is working!')
//     console.log(commentTextArea.value)
//     console.log(usernameTextArea.value)
//     const newComment = JSON.stringify(comment_text)
//     saveComment(newComment);
// }

// const saveComment = (comment) => {
//     // console.log('saveComment function here')
//     fetch('/post/comment', {
//     method: 'POST',
//     body: comment,
//     headers:  { 'Content-Type': 'application/json' },
//  }) 
 


///////////////////////////////////////////////////////////////////////////


// const postGame = (game) => {
//     return fetch("https://cors-test-run.herokuapp.com/https://api.igdb.com/v4/games", {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Accept': 'application/json',
//             'Client-ID': client_id,
//             'Authorization': `Bearer ${authorization}`,
//         },
//         body: `fields id, name, cover.image_id, summary; search "${game}"; where version_parent = null; limit 1;`,
//     })
        
// }

// const createNewUser = async (event) => {
//     event.preventDefault();

//     const username = document.querySelector('#create-username').value.trim()
//     const email = document.querySelector('#create-email').value.trim()
//     const password = document.querySelector('#create-password').value.trim()
//     const confirmPass = document.querySelector('#confirm-password').value.trim()

//     if (username && email && password && confirmPass) {
//         if (password === confirmPass) {
//         const response = await fetch('/api/users', {
//             method: 'POST',
//             body: JSON.stringify({ username, email, password }),
//             headers: { 'Content-Type': 'application/json' },
//         })
//         if (response.ok) {
//             document.location.replace('/profile')
//         } else {
//             alert(response.statusText);
//             // document.location.replace('/login')
//         }
//     } else {
//         alert("Your passwords didn't match!")
//     }
//     }
// }

