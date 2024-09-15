import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/dbConfig.js';
import studentRoutes from './routes/studentRouter.js'
import adminRoutes from './routes/adminRoutes.js'
import marklistRoutes from './routes/marklistRoutes.js' 
const port = process.env.PORT || 3000;
dotenv.config();


connectDB()

const app = express();
app.use(express.json());

//CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/marklist', marklistRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 