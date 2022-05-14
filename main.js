document.querySelector('button').addEventListener('click', getStory);
document.getElementById('clear').addEventListener('click', clearAnswers);
document.querySelector("button").addEventListener('mouseout', clearPlaceholder);

  function clearPlaceholder() {
    document.querySelector("textarea").placeholder = "Ask a question or submit a request (eg. Tell me a story about...)";
  }

let keyNum = 0;
let valueNum = 0;

for (let i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem(localStorage.key(i)))
  keyNum++;

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

function clearAnswers() {
  localStorage.clear();
  list.innerHTML = "";
}

function getStory() {

  let inputString = document.querySelector('textarea').value;

  if (inputString === "") {
    document.querySelector("textarea").placeholder = "You haven't typed anything in yet!";
    return;
  }

  

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
     Authorization: `Bearer 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`,
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
}

