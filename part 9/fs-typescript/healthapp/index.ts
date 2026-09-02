import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { isNotNumber } from './utils.ts';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined || target === null) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (!Array.isArray(daily_exercises) || isNotNumber(target)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const dailyExercisesNum: number[] = [];
  for (const item of daily_exercises) {
    if (isNotNumber(item)) {
      res.status(400).json({ error: 'malformatted parameters' });
      return;
    }
    dailyExercisesNum.push(Number(item));
  }

  const targetNum = Number(target);
  const result = calculateExercises(dailyExercisesNum, targetNum);
  res.json(result);
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

