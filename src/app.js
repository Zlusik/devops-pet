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

app.get("/check", (req, res) => {
  res.json({message: "check new endpoint. Hellow new best world"});
});


module.exports = app;
