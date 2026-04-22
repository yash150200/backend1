// import express from "express";
// import axios from "axios";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/api/ai", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "gryphe/mythomax-l2-13b",
//         messages: [
//           {
//             role: "system",
//             content: "You are PetPal AI, a pet care assistant."
//           },
//           {
//             role: "user",
//             content: req.body.message
//           }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: "AI failed" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log("Server running"));



import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

// 🔥 Force correct .env loading
dotenv.config({ path: "./.env" });

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔍 DEBUG: check if key is loaded
console.log("API KEY:", process.env.OPENROUTER_API_KEY);

app.post("/api/ai", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

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
            content: userMessage
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
    // 🔥 SHOW REAL ERROR
    console.log("ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "AI failed",
      details: err.response?.data || err.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
