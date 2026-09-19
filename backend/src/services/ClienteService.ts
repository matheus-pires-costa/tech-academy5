import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClienteService {
  async criar(dados: { nome: string; telefone: string; endereco?: string }) {
    if (!dados.nome || !dados.telefone) throw new Error('Nome e telefone são obrigatórios');
    return await prisma.cliente.create({ data: dados });
  }

  async listar() {
    return await prisma.cliente.findMany(); // Traz todos os clientes
  }
}