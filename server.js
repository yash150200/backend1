import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gryphe/mythomax-l2-13b",
        messages: [
          {
            role: "system",
            content: "You are PetPal AI, a pet care assistant."
          },
          {
            role: "user",
            content: req.body.message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));