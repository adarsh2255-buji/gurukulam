import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/dbConfig.js';
import studentRoutes from './routes/studentRouter.js'
const port = process.env.PORT || 3000;
dotenv.config();


connectDB()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/students', studentRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 