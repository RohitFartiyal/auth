import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/api', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
