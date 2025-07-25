import express from 'express';
import scrapeRoutes from './scrape'
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', scrapeRoutes);

app.get('/', (req, res) => {
  res.send('Hello World! Your Express server is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
