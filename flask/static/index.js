

function clicked(){
  // spinner on
loading();

const container = document.getElementById("container");
const currentInput = container.lastElementChild;
const prevsubmit = currentInput.querySelector("#submit_btn");
const previnput = currentInput.querySelector("#queryinput");
const prevquery = previnput.value.trim();
const sectorform = document.getElementById('sector');
const sector = sectorform.options[sectorform.selectedIndex].value;

console.log(`submitted query : ${prevquery}`)
console.log(sector)

previnput.disabled = true;
prevsubmit.disabled = true;

getAnswer(sector, prevquery);
}

function getAnswer(sector, query){
const url = `/ask/${sector}/${query}`;
$.getJSON(url, data => {
addAnswer(data.result[1], data.result[2]);
})
}


function addAnswer(answer, key){
console.log("input : ", answer)
const bdinput = document.getElementById("bd-input");
const answerText = `${answer} <br>`;  //get from model output
const answerElem = document.createElement("div");
answerElem.classList.add('answer')
answerElem.innerHTML = answerText;
addFeedback(answerElem, key);

// delete spinner
const spinner = document.getElementById("loading");
spinner.remove();

bdinput.appendChild(answerElem);

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
newInput.removeChild(newInput.lastElementChild)
currentInput.setAttribute("id", "old_input")
const submitButton = newInput.querySelector("#submit_btn");
const inputForm = newInput.querySelector("#queryinput");

submitButton.disabled = false;
inputForm.disabled = false;

const inputHTML = newInput.innerHTML;
const newComp = document.createElement("div");
newComp.classList.add('bd-input');
newComp.setAttribute("id", "bd-input")
newComp.innerHTML = inputHTML;

container.appendChild(newComp);

}

function getRate()
{
const rates = document.getElementsByName('rating')
const key = document.getElementById('key').innerText
const url_rate = `/feedback/${key}/`;
for (i = 0; i < rates.length; i++) {
  if (rates[i].checked){
      console.log(rates[i].value);
      fetch(url_rate+rates[i].value);
      return rates[i].value;
  }
}
return -1;
}

function cont(){
const container = document.getElementById("container");
const currAns = container.lastElementChild;
const prevdone = currAns.querySelector("#done");
const prevcont = currAns.querySelector("#cont");
const stars = currAns.querySelector("#rates");

const rate = getRate();
if (rate <0){
alert('please rate the answer before continue')
return false;
}

//여기서 rate값에 따라 new answer 줄지 말지 결정 가능

else{

prevdone.disabled=true;
prevcont.disabled=true;
stars.innerHTML=''

addNewInput(currAns);
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

// prevdone.disabled=true;
// prevcont.disabled=true;
}

}



function loading(){
  //랜덤 텍스트 만들어서 넣기
const proverbs = ["Don't put all your eggs in one basket.",
"Don't catch a falling knife.",
"Time in the market beats timing the market.",
"A rising tide lifts all boats.",
"Bulls make money, bears make money, pigs get slaughtered.",
"Don't fight the trend.",
"The market is a voting machine in the short term, a weighing machine in the long term.",
"The trend is your friend.",
"Cut your losses and let your profits run.",
"Buy on the rumor, sell on the news.",
"Greed is good, but too much of it can be dangerous.",
"Don't invest in something you don't understand.",
"The stock market is driven by fear and greed.",
"Investing should be boring.",
"Don't let emotions drive your investment decisions.",
"Patience is a virtue in the stock market.",
"Pigs get fat, hogs get slaughtered.",
"Don't try to time the market.",
"Don't invest more than you can afford to lose.",
"Buy quality, not just the cheapest stock.",
"Don't let a single bad investment ruin your portfolio.",
"Be fearful when others are greedy and greedy when others are fearful.",
"Don't invest based on tips from others.",
"The stock market is a marathon, not a sprint.",
"Don't let short-term market fluctuations discourage you.",
"Don't put your faith in a single stock.",
"Invest in companies with a competitive advantage.",
"Don't be swayed by market noise.",
"The market can remain irrational longer than you can stay solvent.",
"Don't invest with borrowed money.",
"Invest in companies with strong management teams.",
"Do your own research before investing.",
"Invest in assets, not liabilities.",
"Be prepared for market volatility.",
"Don't let fear or greed drive your investment decisions.",
"Investing is a marathon, not a sprint.",
"Don't mistake a bull market for genius."];
const todaysQuote = proverbs[Math.floor(Math.random() * proverbs.length)];
const load = document.createElement("div");
load.classList.add('p-3');
load.setAttribute('id', 'loading');

load.innerHTML =  `
          <strong> Finding answers...  </strong>
          <div class="spinner-border" role="status" aria-hidden="true"></div> <br>
          <strong>today's quote : ${todaysQuote}</strong>`;

// return load;

document.getElementById('main').appendChild(load);

}