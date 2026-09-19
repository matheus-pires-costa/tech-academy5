import express, { Request, Response } from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes';
import clienteRoutes from './routes/clienteRoutes';
import authRoutes from './routes/authRoutes';
import procedimentoRoutes from './routes/procedimentoRoutes';
import agendamentoRoutes from './routes/agendamentoRoutes'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/auth', authRoutes);
app.use('/procedimentos', procedimentoRoutes);
app.use('/agendamentos', agendamentoRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 - Jarvis online!');
});