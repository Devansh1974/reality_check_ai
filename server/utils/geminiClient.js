const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Models to try in order (free/cheap models on OpenRouter)
// Note: To use these free models, you MUST allow data sharing in your OpenRouter privacy settings:
// https://openrouter.ai/settings/privacy
const MODELS = [
  "google/gemini-2.5-flash:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "qwen/qwen-2.5-coder-32b-instruct:free",
];

async function generateResponse(prompt, retries = 1) {
  let lastError = null;

  for (const model of MODELS) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "Reality Check - Awareness Platform",
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "system",
                content:
                  "You are an educational awareness AI assistant. Always respond in valid JSON format only. No markdown, no code fences, just raw JSON.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 2048,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg =
            errorData?.error?.message || `HTTP ${response.status}`;
          console.error(`[${model}] Attempt ${attempt + 1}: ${errorMsg}`);
          lastError = new Error(errorMsg);

          // Rate limited — wait and retry
          if (response.status === 429 && attempt < retries) {
            const waitTime = Math.pow(2, attempt + 1) * 1000;
            console.log(`Rate limited. Waiting ${waitTime / 1000}s...`);
            await new Promise((r) => setTimeout(r, waitTime));
            continue;
          }
          // Try next model for other errors
          break;
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;

        if (!text) {
          lastError = new Error("Empty response from AI model");
          break;
        }

        // Parse JSON from the response
        try {
          return JSON.parse(text);
        } catch {
          // Try to extract JSON from text (sometimes wrapped in markdown)
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
          console.error(`[${model}] JSON parse failed, raw text:`, text.slice(0, 200));
          lastError = new Error("Failed to parse AI response as JSON");
          break;
        }
      } catch (error) {
        lastError = error;
        console.error(`[${model}] Attempt ${attempt + 1} error:`, error.message);
        if (attempt < retries) {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    }
  }

  throw new Error(
    lastError?.message || "Failed to generate AI response. Please try again."
  );
}

module.exports = { generateResponse };
