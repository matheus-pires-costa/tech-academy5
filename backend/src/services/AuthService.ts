import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'segredodaapiacademy'; // Chave secreta para o token

export class AuthService {
  async autenticar(email: string, senhaPlana: string) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) throw new Error('Credenciais inválidas');

    const senhaValida = await bcrypt.compare(senhaPlana, usuario.senha);
    if (!senhaValida) throw new Error('Credenciais inválidas');

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1d' });
    return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
  }
}