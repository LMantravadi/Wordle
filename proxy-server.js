import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (request, response) => {
  try {
    const response = await fetch("https://wordle-api.vercel.app/api/wordle", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ guess: "words" }),
    });
    const data = await response.json();
  } catch (error) {
    console.error("Error checking guess:", error);
  }
});

app.listen(5000, () => {
  console.log("Server started...");
});
