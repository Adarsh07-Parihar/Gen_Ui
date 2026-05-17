const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";

const model = "deepseek/deepseek-chat";

export const generateResponse = async (prompt) => {

    const res = await fetch(openRouterUrl, {

        method: 'POST',

        headers: {
            Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({

            model: model,

            messages: [

                {
                    role: "system",
                    content: `
Return ONLY valid JSON.

Rules:
- Escape all quotes properly
- Do not include markdown
- Do not use triple backticks
- Do not explain anything
- Return compact valid JSON only
`
                },

                {
                    role: 'user',
                    content: prompt,
                },
            ],

            temperature: 0.2,

            max_tokens: 2500
        }),
    });

    if (!res.ok) {

        const err = await res.text();

        throw new Error("openRouter err " + err);
    }

    const data = await res.json();

   const raw = data.choices[0].message.content;

const cleaned = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return cleaned;
};
