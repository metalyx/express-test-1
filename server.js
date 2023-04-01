import express from "express";
import posts from "./data.js";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
const app = express();
const PORT = 5010;

app.use(bodyParser.json()); //middleware

app.get("/test", (req, res) => {
  res.send("Test endpoint");
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/users", (req, res) => {
  const { firstName, lastName, email, age } = req.body;
  if (!(firstName && lastName && email && age)) {
    res.status(400).send({
      message:
        "Please send all required fields: firstName, lastName, email, age",
    });
  }
  const userID = uuidv4();
  res.status(201).send({
    id: userID,
    firstName: firstName,
    lastName: lastName,
    email: email,
    age: age,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
