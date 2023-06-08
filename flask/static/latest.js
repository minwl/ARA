function init(){
    const body = document.querySelector('#news-bd');
    // fetch('/latest')
    $.getJSON('/latest', data => 
        {
            res = data.result;
            res.forEach(r => 
            body.append(news(r))
            )
            
        }
    ) 
}

function news(r){
  const new_div = document.createElement("div")
  new_div.classList.add('new_div')
  const sec = r['sector'].slice(3)
  const title = r['titles']
  const innerhtml = `
  <h2> ${sec} </h2>
  <li> ${title[0]} </li>
  <li> ${title[1]} </li>
  <li> ${title[2]} </li>
  `
  new_div.innerHTML = innerhtml
  return new_div
}

$(document).ready(init)