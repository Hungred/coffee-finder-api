import express from 'express';
import cors from 'cors';
import cafesRouter from './routes/cafes.js';
import optionsRouter from './routes/options.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cafes', cafesRouter);
app.use('/api/cafes/options', optionsRouter);
app.use('/api/cafes', authRouter);

app.get('/', (_, res) => {
  res.send('Coffee Finder API is running');
});

export default app;
