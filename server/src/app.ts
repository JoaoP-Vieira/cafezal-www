import express from 'express';
import cors from 'cors';
import users from './routes/users';

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', users);

app.get('/', (req, res) => {
  res.send('Hello there!');
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
