import express from 'express';
import cors from 'cors';
import cafesRouter from './routes/cafes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cafes', cafesRouter);

app.get('/', (_, res) => {
  res.send('Coffee Finder API is running');
});

export default app;
