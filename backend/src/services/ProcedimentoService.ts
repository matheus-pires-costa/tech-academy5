import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProcedimentoService {
  async criar(dados: { nome: string; preco: number; descricao?: string }) {
    if (!dados.nome || dados.preco === undefined) throw new Error('Nome e preço obrigatórios');
    return await prisma.procedimento.create({ data: dados });
  }

  async listar() {
    return await prisma.procedimento.findMany();
  }
}