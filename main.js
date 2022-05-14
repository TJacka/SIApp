document.querySelector('button').addEventListener('click', getStory);

function getStory() {

  let inputString = document.querySelector('textarea').value;

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
    // let li = document.createElement('li');  
    // document.querySelector('ul').appendChild(li);
    // li.innerHTML =  <div>
    //                   <h3>`Prompt: ${inputString}`</h3>
    //                   <h3>`Response: ${data.choices[0].text}`</h3>
    //                 </div>
    const list = document.getElementById("list");
    list.innerHTML += 
      `<li>
        <div class="prompt--div">
          <h3 class="prompts">Prompt:</h3>
          <h3>${inputString}</h3><br />
        </div>
        <div class="response--div">
          <h3 class="prompts">Response:</h3>
          <h3>${data.choices[0].text}</h3>
        </div>
      </li>`;
                      
      })
   .catch(error => {
   console.log(error)
   });
}
