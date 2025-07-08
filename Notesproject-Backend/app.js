import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();

// Middlewares
const allowedOrigins = ['http://localhost:5173']; // your frontend URL here

app.use(cors({
  origin: allowedOrigins,
  credentials: true,  // allow sending cookies/auth headers if needed
}));
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

export default app;
