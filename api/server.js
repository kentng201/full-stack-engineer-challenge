const express = require('express');
require('./src/database');

const Result = require('./src/entity/Result');

const port = process.env.port || 8000;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/api/scans', async (req, res) => {
  const result = await Result.find();
  return res.status(200).json(result);
});

app.post('/api/scans', async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.listen(port, 
  () => console.log(`API server running in localhost:${port}`)
);