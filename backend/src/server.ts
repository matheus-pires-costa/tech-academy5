import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // Permite o Node entender JSON

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API da CN Estética rodando perfeitamente! 🚀' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} - Vamo pra cima!`);
});