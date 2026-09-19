import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClienteService {
  async criar(dados: { nome: string; telefone: string; endereco?: string }) {
    if (!dados.nome || !dados.telefone) throw new Error('Nome e telefone são obrigatórios');
    return await prisma.cliente.create({ data: dados });
  }

  async listar() {
    return await prisma.cliente.findMany();
  }

  // NOVO MÉTODO: ATUALIZAR CLIENTE
  async atualizar(id: number, dados: { nome?: string; telefone?: string; endereco?: string }) {
    if (!dados.nome && !dados.telefone && !dados.endereco) throw new Error('Dados para atualização não fornecidos');
    return await prisma.cliente.update({
      where: { id },
      data: dados,
    });
  }

  async deletar(id: number) {
    return await prisma.cliente.delete({
      where: { id },
    });
  }
}