// fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))

// let fetchedObj = [];

// fetch('https://jsonplaceholder.typicode.com/posts')
//       .then(response => response.json())
//       .then(json => fetchedObj = json)

async function getAPI(url){
try {
    let response = await fetch(url);  // awaits for fetch to grab URL, then puts promise content into response (either resolve or reject) 
    return await response.json(); // awaits for response to be parsed

} catch (error) {  // Catches errors
    console.log(error);
}    

};



async function getPosts(){
    let posts = await getAPI('https://jsonplaceholder.typicode.com/posts');  // takes posts from URL, passes it to posts
    return posts;
}

async function renderAllPosts(){
    clearPosts(); // clears or "hides" posts
    let posts = await getPosts();  //grabs posts from other function
    //console.log(posts);

    let postStacking = ''; //empty for now, the following code will stack individual posts to be placed in the empty HTML element

    posts.forEach(post => {    // iterates through elements, stringifys the individual post objects, and then adds to post stacking
        let individualPost = JSON.stringify(post);

        postStacking += '<br>'+individualPost+'<br><br>';

    });

    let emptyHTML = document.querySelector('.posts');  
     emptyHTML.innerHTML = postStacking;  
}

async function renderPostIDTen(){
    clearPosts();
    let postTen = await getAPI('https://jsonplaceholder.typicode.com/posts?userId=10')

    let postStacking = ''; //empty for now, the following code will stack individual posts to be placed in the empty HTML element

    postTen.forEach(post => {    // iterates through elements, stringifys the individual post objects, and then adds to post stacking
        let individualPost = JSON.stringify(post);

        postStacking += '<br>'+individualPost+'<br><br>';

    });

    let emptyHTML = document.querySelector('.posts');  
     emptyHTML.innerHTML = postStacking;  
}



async function createPost() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "empty",
      body: "emptier",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  
let post = await response.json();
  console.log(post.id);

  let emptyHTML = document.querySelector('.posts');  
  emptyHTML.innerHTML = post.id;  
}



async function replacePost() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/12", {
      method: "PUT",
      body: JSON.stringify({
        title: "replaced",
        body: "replaced",
        userId: 9000,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })

    let post = await response.json();
    
  
    let emptyHTML = document.querySelector('.posts');  
    emptyHTML.innerHTML = JSON.stringify(post);    
  
  }

  async function updatePost() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/12", {
      method: "PATCH",
      body: JSON.stringify({
        title: "empty",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })

    let post = await response.json();
  
    let emptyHTML = document.querySelector('.posts');  
    emptyHTML.innerHTML = JSON.stringify(post);
  
  }

async function deletePost() {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts/12', {
    method: 'DELETE'
  });

  if (response.ok) {
    let emptyHTML = document.querySelector('.posts');  
    emptyHTML.innerHTML = 'Post deleted';
  } else {
    let emptyHTML = document.querySelector('.posts');  
    emptyHTML.innerHTML = 'Something went wrong, post might still be available.';
  }
}


 function clearPosts(){
    let emptyHTML = document.querySelector('.posts');  
     emptyHTML.innerHTML = ''
}


const button1 = document.querySelector('#allPosts');
button1.addEventListener('click', renderAllPosts);

const button2 = document.querySelector('#get');
button2.addEventListener('click', renderPostIDTen);

const button3 = document.querySelector('#create');
button3.addEventListener('click', createPost);

const button4 = document.querySelector('#replace');
button4.addEventListener('click', replacePost);

const button5 = document.querySelector('#update');
button5.addEventListener('click', updatePost);

const button6 = document.querySelector('#delete');
button6.addEventListener('click', deletePost);