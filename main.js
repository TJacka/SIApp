const data = {
    prompt: "Write a poem about a dog wearing skis",
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
      Authorization: `Bearer ${process.env.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}`,
    },
    body: JSON.stringify(data),
   });
   