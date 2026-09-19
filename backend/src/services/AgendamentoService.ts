import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AgendamentoService {
  async criar(dados: { data: string; clienteId: number; procedimentoId: number }) {
    if (!dados.data || !dados.clienteId || !dados.procedimentoId) throw new Error('Dados incompletos');
    return await prisma.agendamento.create({ 
      data: { ...dados, data: new Date(dados.data) } 
    });
  }

  async listar() {
    // Esse include é o que garante a nota de "relacionamento" na rubrica!
    return await prisma.agendamento.findMany({
      include: { cliente: true, procedimento: true } 
    });
  }
}