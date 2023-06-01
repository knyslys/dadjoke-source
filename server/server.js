import express from "express";

import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";

const router = express.Router();
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

app.listen(process.env.PORT || 5173, () => {
  console.log("Server listening on port 5173");
});

app.post("/fetchjokes", async (req, res) => {
  const words = req.body.toString();
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Generate a dad joke with these following words with plot-twist ending: " +
        words,
      temperature: 1.2,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });
    console.log(response.data);
    res.status(200).send({
      text: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
  }
});
