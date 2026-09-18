import express, { Request, Response } from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 - Jarvis online!');
});