const express = require('express');
const cors = require('cors');
const cafesRouter = require('./routes/cafes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cafes', cafesRouter);

app.get('/', (_, res) => {
  res.send('Coffee Finder API is running');
});

module.exports = app;
