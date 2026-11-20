const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get("/health", (req, res) => {
  res.json({status: "ok"});
});

// Новая ручка
app.get("/hello", (req, res) => {
  res.json({message: "Hello from DevOps pipeline!"});
});

module.exports = app;
