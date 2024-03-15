import express from "express";
import Validate from "./validate.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/validate", (req, res) => {
  const { username, password } = req.body;
  try {
    const token = Validate.generarToken(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get("/products", (req, res) => {
  const { category, minPrice } = req.query;
  try {
    const availableProducts = Validate.availableProducts(category, minPrice);
    res.status(200).json(availableProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/comments", (req, res) => {
  const { text } = req.body;
  try {
    const newComment = Validate.createComment(text);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
