function clicked(){
  console.log('submit button clicked')
  const container = document.getElementById("container");
  const currentInput = container.lastElementChild;
  const prevsubmit = currentInput.querySelector("#submit_btn");
  const previnput = currentInput.querySelector("#queryinput");
  const prevquery = previnput.value.trim();

  console.log(`submitted query : ${prevquery}`)
  if (prevquery === "") {
    return false
  }

  previnput.disabled = true;
  prevsubmit.disabled = true;

  getAnswer(prevquery);
}

function getAnswer(query){
  const url = '/ask/'+query;
  $.getJSON(url, data => {
    console.log(data.result[1]);
    addAnswer(data.result[1], data.result[2]);
  })
}


function addAnswer(answer, key){
  console.log("input : ", answer)
  const answerText = `This is the result <br> ${answer} <br>`;  //get from model output
  const answerElem = document.createElement("div");
  answerElem.classList.add('bd-answer', 'p-3')
  answerElem.innerHTML = answerText;
  addFeedback(answerElem, key);

  container.appendChild(answerElem);

}

function addFeedback(answer, key){
  const feedbackHTML = `
  <div class="col align-self-center">
    
    <div id = "rates" class="rating">
      <input type="radio" name="rating" value="5" id="5" onclick="getRate()"><label for="5">☆</label>
      <input type="radio" name="rating" value="4" id="4" onclick="getRate()"><label for="4">☆</label>
      <input type="radio" name="rating" value="3" id="3" onclick="getRate()"><label for="3">☆</label>
      <input type="radio" name="rating" value="2" id="2" onclick="getRate()"><label for="2">☆</label>
      <input type="radio" name="rating" value="1" id="1" onclick="getRate()"><label for="1">☆</label>
    </div>
    <div class = 'contbtn'>  
      <input id = 'cont' class = 'btn btn-sm btn-outline-success' type ='submit' value = 'Continue' style="margin :1px" onclick="cont()">
      <input id ='done' class = 'btn btn-sm btn-outline-success' type ='submit' value="Done" style="margin :1px" onclick="done()" >
    </div> 
  </div>
    <div class = 'hidden' id = 'key'>${key}</div>
`;

const star = document.createElement("div");
star.classList.add('row', 'flex-wrap', 'flex-lg-nowrap')
star.innerHTML = feedbackHTML
answer.appendChild(star)

}

function addNewInput(currentInput){

  const newInput = currentInput.cloneNode(true);
  const submitButton = newInput.querySelector("#submit_btn");
  const inputForm = newInput.querySelector("#queryinput");

  submitButton.disabled = false;
  inputForm.disabled = false;
  
  const inputHTML = newInput.outerHTML;
  const newComp = document.createElement("div");
  newComp.innerHTML = inputHTML;

  container.appendChild(newComp);

}

function getRate()
{
  const rates = document.getElementsByName('rating')
  const key = document.getElementById('key').innerText
  console.log('why?')
  console.log(key);
  const url_rate = `/feedback/${key}/`;
    for (i = 0; i < rates.length; i++) {
        if (rates[i].checked){
            console.log(rates[i].value);
      fetch(url_rate+rates[i].value);
      return rates[i].value;
        }}
  return -1;
    }

function cont(){
  const container = document.getElementById("container");
  const currAns = container.lastElementChild
  const currentInput = container.lastElementChild.previousElementSibling;
  const prevdone = currAns.querySelector("#done");
  const prevcont = currAns.querySelector("#cont");
  const stars = currAns.querySelector("#rates");

  const rate = getRate();
  if (rate <0){
    alert('please rate the answer before continue')
    return false;
  }
  else{

  prevdone.disabled=true;
  prevcont.disabled=true;
  stars.innerHTML=''

  addNewInput(currentInput);
  }
}

function done(){
  const container = document.getElementById("container");
  const currAns = container.lastElementChild
  const prevdone = currAns.querySelector("#done");
  const prevcont = currAns.querySelector("#cont");
  const rate = getRate();
  if (rate <0){
    alert('please rate the answer before close')
    return false;
  }
  else{

  prevdone.disabled=true;
  prevcont.disabled=true;}

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