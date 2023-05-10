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

  addAnswer();
}


function addAnswer(){

  const answerText = `This is the result <br> ... <br> ... <br> ... <br>`;  //get from model output
  const answer = document.createElement("div");
  answer.classList.add('bd-intro', 'p-3')
  answer.innerHTML = answerText;
  addFeedback(answer);

  container.appendChild(answer);

}

function addFeedback(answer){
  const feedbackHTML = `
  <div class="col align-self-center">
  <div id = "rates">
  <div  class="rating">
    <input type="radio" name="rating" value="5" id="5" onclick="getRate()"><label for="5">☆</label>
    <input type="radio" name="rating" value="4" id="4" onclick="getRate()"><label for="4">☆</label>
    <input type="radio" name="rating" value="3" id="3" onclick="getRate()"><label for="3">☆</label>
    <input type="radio" name="rating" value="2" id="2" onclick="getRate()"><label for="2">☆</label>
    <input type="radio" name="rating" value="1" id="1" onclick="getRate()"><label for="1">☆</label>
    </div>
  </div>
    <div class = 'contbtn'>  
      <input id ='done' class = 'btn btn-sm btn-outline-success' type ='submit' value="Done" style="margin :1px" >
      <input id = 'cont' class = 'btn btn-sm btn-outline-success' type ='submit' value = 'Continue' style="margin :1px" onclick="cont()">
    </div> 
</div> 
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
{	const rates = document.getElementsByName('rating')
	for (i = 0; i < rates.length; i++) {
		if (rates[i].checked){
			console.log(rates[i].value);
      break;
		}}
	}

function cont(){
  getRate();
  const container = document.getElementById("container");
  const currAns = container.lastElementChild
  const currentInput = container.lastElementChild.previousElementSibling;
  const prevdone = currAns.querySelector("#done");
  const prevcont = currAns.querySelector("#cont");
  const stars = currAns.querySelector("#rates");
  prevdone.disabled=true;
  prevcont.disabled=true;
  stars.innerHTML=''

  addNewInput(currentInput);


}

function init() {
console.log('page is ready');

}


window.addEventListener("load", init);








//old js
// function validateForm() {
//   const inputForm = document.getElementById("queryinput");
//   const submitButton = document.getElementById("submit_btn");
//   if (inputForm.value.trim() === "") {
//     return true;
//   } else {
//     console.log(inputForm.value.trim());
//     return false;
//   }
// }

// function addNewInput() {
//   const container = document.getElementById("container");
//   const currentInput = container.lastElementChild.previousElementSibling;
//   const prevsubmit = currentInput.querySelector("#submit_btn");
//   const previnput = currentInput.querySelector("#queryinput");
//   prevsubmit.disabled = true;
//   prevsubmit.disabled = true;

//   const newInput = currentInput.cloneNode(true);
//   const submitButton = newInput.querySelector("#submit_btn");
//   const inputForm = newInput.querySelector("#queryinput");

//   submitButton.disabled = false;
//   inputForm.disabled = false;

//   const inputHTML = newInput.outerHTML;
//   const newComp = document.createElement("div");
//   newComp.innerHTML = inputHTML;

//   container.appendChild(newComp);
// }
// const container = document.getElementById("container");
// const currentInput = container.lastElementChild;
// const submitButton = currentInput.querySelector("#submit_btn");
// const inputForm = currentInput.querySelector("#queryinput");

// submitButton.addEventListener("click", function(event) {
//   console.log('submit button clicked')
//   if (!validateForm()) {
//     event.preventDefault(); // Prevent form submission if validation fails
//     addAnswer();
//     addNewInput();
  
//   }
// });
