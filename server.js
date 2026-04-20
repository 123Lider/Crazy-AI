import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "YOUR_VERTEX_API_KEY";

app.post("/ai", async (req, res) => {
  const msg = req.body.message;

  try {
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: msg }] }]
        })
      }
    );

    const data = await r.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

    res.json({ reply });

  } catch {
    res.json({ reply: "Server error" });
  }
});

app.listen(3000, () => console.log("Running"));

app.get("/", (req, res) => {
  res.send("AI Server is running ✅");
});
