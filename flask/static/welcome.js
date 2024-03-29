function login(){
  const id = document.querySelector('#id').value;
  const pwd = document.querySelector('#pwd').value;
  const valid_url = `/valid/${id}/${pwd}`
  $.getJSON(valid_url, data => {
    const valid = data.success;
    const username = data.username;
    if (valid){
      const greet = document.getElementById("greet")
      const greetText = `<h1> Welcome, ${username} </h1>`;
      greet.innerHTML = greetText;
      const welcome = document.getElementById('welcomeContainer')
      const loginform = document.getElementById("loginContainer")
      loginform.classList.add('hidden')
      welcome.classList.remove('hidden')
      sessionStorage.setItem('username', username);
    }
    else{
      if(username){alert('please enter valid password')}
      else{alert('please enter valid id')}
    }
  })

}



function registerShow(){
  const register = document.getElementById('registerContainer')
  const loginform = document.getElementById("loginContainer")
  loginform.classList.add('hidden')
  register.classList.remove('hidden')
}

function registerNew(){
  const newid = document.getElementById('newid').value
  const newpwd = document.getElementById('newpwd').value
  const newFirst = document.getElementById('newFirstName').value
  const newLast = document.getElementById('newLastName').value
  const newEmail = document.getElementById('newEmailAdd').value
  const userinfo = {'id' : newid, 'pwd' : newpwd, 'first' : newFirst, 'last' : newLast, 'email' : newEmail};
  console.log(userinfo)
  for(var e in userinfo){
      if (userinfo[e] === ''){
      alert(`please enter valid ${e}`)
      return false
    }
  }

  //db에 user info 저장
  const url_new = `/register/${newid}/${newpwd}/${newFirst}/${newLast}/${newEmail}`;
  $.getJSON(url_new, data => {
      if (data.success)
      {console.log('register success');
      location.reload();
  }
      else{alert('ID already exist')}
  })

}


function init() {
  console.log('page is ready');
  const savedUsername = sessionStorage.getItem("username");
  if (savedUsername === null){
  
  }
  else {
    const greet = document.getElementById("greet")
    const greetText = `<h1> Welcome, ${savedUsername} </h1>`;
    greet.innerHTML = greetText;
    const welcome = document.getElementById('welcomeContainer')
    const loginform = document.getElementById("loginContainer")
    loginform.classList.add('hidden')
    welcome.classList.remove('hidden')
    localStorage.setItem('username', username);
  }
  }
  
  
  window.addEventListener("load", init);
