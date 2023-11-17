import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  organization: "org-RxKdJy03awcTxiIq6UICrk0u",
});

const prompt = 'Once upon a time';
const completion = await openai.completions.create({
  model: 'gpt-3.5-turbo-instruct',
  prompt: prompt
});

console.log(completion.choices[0].text);