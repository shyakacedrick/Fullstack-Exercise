import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { isNotNumber } from './utils.ts';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);
  const bmi = calculateBmi(heightNum, weightNum);

  res.json({
    weight: weightNum,
    height: heightNum,
    bmi,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
