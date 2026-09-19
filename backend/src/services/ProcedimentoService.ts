import { PrismaClient } from '@prisma/client';
import { ProcedimentoDTO, ProcedimentoUpdateDTO } from '../types';

const prisma = new PrismaClient();

export class ProcedimentoService {
  async criar(dados: ProcedimentoDTO) {
    if (!dados.nome || !dados.preco) throw new Error('Nome e preço obrigatórios');
    return await prisma.procedimento.create({ data: dados });
  }
  async listar(pagina: number, limite: number) {
    const pular = (pagina - 1) * limite;
    const dados = await prisma.procedimento.findMany({ skip: pular, take: limite });
    const total = await prisma.procedimento.count();
    return { dados, total, pagina, paginas: Math.ceil(total / limite) };
  }
  async buscarId(id: number) {
    const proc = await prisma.procedimento.findUnique({ where: { id } });
    if (!proc) throw new Error('404: Procedimento não encontrado');
    return proc;
  }
  async atualizar(id: number, dados: ProcedimentoUpdateDTO) {
    await this.buscarId(id);
    return await prisma.procedimento.update({ where: { id }, data: dados });
  }
  async deletar(id: number) {
    await this.buscarId(id);
    return await prisma.procedimento.delete({ where: { id } });
  }
}