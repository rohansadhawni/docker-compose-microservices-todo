const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./models/Todo');
const app = express();
const port = 5000;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });
  await newTodo.save();
  res.json(newTodo);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
