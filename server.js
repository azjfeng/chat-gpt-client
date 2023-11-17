import express from "express";
import process from "process";
const app = express();
const port = 5175;
import openai from "openai";

const Openai = new openai({
  apiKey: process.env.apiKey,
});

// 定义路由
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// 定义路由
app.post("/api/users", async (req, res) => {
  console.log('aaaaa')
  const prompt = "Once upon a time";
  const response = await Openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{role: 'user', content: prompt}],
    temperature: 0.7,
  });
  console.log(response.choices[0].text);
  res.send("Hello, World!");
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
