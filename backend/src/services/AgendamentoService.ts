import { PrismaClient } from '@prisma/client';
import { AgendamentoDTO, AgendamentoUpdateDTO } from '../types';

const prisma = new PrismaClient();

export class AgendamentoService {
  async criar(d: AgendamentoDTO) {
    if (!d.dataHora || !d.clienteId || !d.procedimentoId) throw new Error('Dados inválidos');
    return await prisma.agendamento.create({ data: { ...d, dataHora: new Date(d.dataHora) } });
  }
  async listar(pagina: number, limite: number) {
    const pular = (pagina - 1) * limite;
    const dados = await prisma.agendamento.findMany({ skip: pular, take: limite, include: { cliente: true, procedimento: true } });
    const total = await prisma.agendamento.count();
    return { dados, total, pagina, paginas: Math.ceil(total / limite) };
  }
  async buscarId(id: number) {
    const agend = await prisma.agendamento.findUnique({ where: { id } });
    if (!agend) throw new Error('404: Agendamento não encontrado');
    return agend;
  }
  async atualizar(id: number, d: AgendamentoUpdateDTO) {
    await this.buscarId(id);
    const dadosFormatados = d.dataHora ? { ...d, dataHora: new Date(d.dataHora) } : d;
    return await prisma.agendamento.update({ where: { id }, data: dadosFormatados });
  }
  async deletar(id: number) {
    await this.buscarId(id);
    return await prisma.agendamento.delete({ where: { id } });
  }
}