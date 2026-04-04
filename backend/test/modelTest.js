import express from "express";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const router = express.Router();

router.get("/models", async (req, res) => {
  try {
    const models = await groq.models.list();
    res.json(models);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
