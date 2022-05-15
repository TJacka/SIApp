document.getElementById('submit').addEventListener('click', getStory);
document.getElementById('submit').addEventListener('mouseout', clearPlaceholder);
document.getElementById('clear').addEventListener('click', clearAnswers);
document.querySelector("h2").style.display = "none";
document.getElementById('Q&A').addEventListener('click', qa);
document.getElementById('grammar').addEventListener('click', grammar);
document.getElementById('secondgrade').addEventListener('click', secondgrade);
document.getElementById('getkeywords').addEventListener('click', getkeywords);
document.getElementById('books').addEventListener('click', books);
document.getElementById('studynotes').addEventListener('click', studynotes);

let keyNum = 0;
let valueNum = 0;

for (let i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem(localStorage.key(i)))
  keyNum++;

  const list = document.getElementById("list");
  document.querySelector("h2").style.display = "block";
  list.innerHTML += 
      `<li>
        <div class="prompt--div">
          <h3 class="prompts">Prompt:</h3>
          <h3>${localStorage.key(i)}</h3>
          <br />
        </div>
        <div class="response--div">
          <h3 class="prompts">Response:</h3>
          <h3>${localStorage.getItem(localStorage.key(keyNum - 1))}</h3>
        </div>
      </li>`
}

function qa() {
  document.querySelector("textarea").placeholder = "Ask a question or submit a request (eg. When will the singularity occur?)";
}

function grammar() {
  document.querySelector("textarea").placeholder = "Correct your grammar. (eg. Correct this to standard English:\
  She no went to the market.)";
}

function secondgrade() {
  document.querySelector("textarea").placeholder = "2nd grade summary (eg. Summarize this for a second-grade student:\ Jupiter is the fifth planet from the Sun and the largest in the Solar System.)";
}

function getkeywords() {
  document.querySelector("textarea").placeholder = "Get keywords from text (eg. Extract keywords from this text:\ Black-on-black ware is a 20th- and 21st-century pottery tradition developed by the Puebloan Native American ceramic artists in Northern New Mexico.)";
}

function books() {
  document.querySelector("textarea").placeholder = "Get a list of books by genre (eg. List 10 science fiction books:)";
}

function studynotes() {
  document.querySelector("textarea").placeholder = "Make study notes on a specific subject (eg. What are 5 key points I should know when studying Ancient Rome?)";
}

function clearPlaceholder() {
  document.querySelector("textarea").placeholder = "Ask me anything, or select another query type...";
}

function clearAnswers() {
  localStorage.clear();
  list.innerHTML = "";
  document.querySelector("h2").style.display = "none";
}

import OPENAI_API_KEY from "./apikey.js";

function getStory() {

  let inputString = document.querySelector('textarea').value;

  if (inputString === "") {
    document.querySelector("textarea").placeholder = "You haven't typed anything in yet!";
    return;
  }

  document.querySelector("textarea").value = ""

  const data = {
      prompt: `${inputString}`,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
  };

  fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${OPENAI_API_KEY}`,
   },
   body: JSON.stringify(data),
   }) 
   
   .then(res => res.json())
   .then(data => {
    console.log(data)
    
    const list = document.getElementById("list");

    inputString ? list.innerHTML += 
      `<li>
        <div class="prompt--div">
          <h3 class="prompts">Prompt:</h3>
          <h3>${inputString}</h3><br />
        </div>
        <div class="response--div">
          <h3 class="prompts">Response:</h3>
          <h3>${data.choices[0].text}</h3>
        </div>
      </li>` : "";
      const response = `${data.choices[0].text}`;
      localStorage.setItem(inputString, response)
      })
   .catch(error => {
   console.log(error)
   
  });
   
   document.querySelector("h2").style.display = "block";
}

