// eslint-disable-next-line no-undef
// const express = require('express');
import express from "express";

import OpenAI from "openai";

export const openaiRequest = new OpenAI({
  // eslint-disable-next-line no-undef
  apiKey: process.env.apiKey,
  dangerouslyAllowBrowser: true,
});

const app = express();
app.use(express.json());
const port = 3000;

// 定义多个请求接口
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/users", async (req, res) => {
  const { text } = req.body;
  const chatCompletion = await openaiRequest.chat.completions.create({
    messages: [{ role: "user", content: text }],
    model: "gpt-3.5-turbo",
  });
  console.log('chatCompletion', chatCompletion)
  res.json(chatCompletion);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

