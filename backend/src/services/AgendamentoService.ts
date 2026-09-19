import { PrismaClient } from '@prisma/client';
import { AgendamentoDTO, AgendamentoUpdateDTO } from '../types';

const prisma = new PrismaClient();

export class AgendamentoService {
  async criar(dados: AgendamentoDTO) {
    if (!dados.dataHora || !dados.clienteId || !dados.procedimentoId) {
      throw new Error('Data, Cliente e Procedimento são obrigatórios');
    }
    
    return await prisma.agendamento.create({ 
      data: {
        clienteId: dados.clienteId,
        procedimentoId: dados.procedimentoId,
        status: dados.status,
        dataHora: new Date(dados.dataHora) // Passando o objeto Date diretamente
      } 
    });
  }

  async listar(pagina: number, limite: number) {
    const pular = (pagina - 1) * limite;
    return await prisma.agendamento.findMany({
      skip: pular,
      take: limite,
      include: { cliente: true, procedimento: true }
    });
  }

  async buscarId(id: number) {
    const agendamento = await prisma.agendamento.findUnique({ where: { id } });
    if (!agendamento) throw new Error('Agendamento não encontrado');
    return agendamento;
  }

  async atualizar(id: number, dados: AgendamentoUpdateDTO) {
    await this.buscarId(id);
    
    // Separa a dataHora do resto dos dados para tratar a conversão
    const { dataHora, ...resto } = dados;
    const dadosParaAtualizar: any = { ...resto };
    
    if (dataHora) {
      dadosParaAtualizar.dataHora = new Date(dataHora);
    }

    return await prisma.agendamento.update({ 
      where: { id }, 
      data: dadosParaAtualizar 
    });
  }

  async deletar(id: number) {
    await this.buscarId(id);
    return await prisma.agendamento.delete({ where: { id } });
  }
}