async function main(prompt) {
  if (!prompt || prompt.trim() === "") {
    return "Please enter a valid prompt.";
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        { role: "user", content: prompt }
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  const text = data?.content?.[0]?.text ?? "No response received.";
  return String(text);
}

export default main;
