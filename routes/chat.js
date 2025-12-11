const express = require("express");
const router = express.Router();

const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.get('/', (req, res) => {
    res.render("chat.ejs");
});

router.post('/ask', async (req, res) => {
    const message = req.body.message;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { 
                    role: "system", 
                    content: "You are MealBot, an AI that suggests meals, recipes, cuisines, and food ideas. Give helpful, friendly short answers. If a user queries with anything outside of meals, food, or nutrition, kinddly decline answering." 
                },
                { role: "user", content: message }
            ]
        });

        const reply = response.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error(error);
        res.json({ reply: "Sorry! I couldn't come up with a meal suggestion right now." });
    }
});

module.exports = router;
