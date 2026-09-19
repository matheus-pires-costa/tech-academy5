import { PrismaClient } from '@prisma/client';
import { ClienteDTO, ClienteUpdateDTO } from '../types';

const prisma = new PrismaClient();

export class ClienteService {
  async criar(dados: ClienteDTO) {
    if (!dados.nome || !dados.telefone) throw new Error('Dados inválidos');
    return await prisma.cliente.create({ data: dados });
  }

  async listar(pagina: number, limite: number) {
    const pular = (pagina - 1) * limite;
    const dados = await prisma.cliente.findMany({ skip: pular, take: limite });
    const total = await prisma.cliente.count();
    return { dados, total, pagina, paginas: Math.ceil(total / limite) };
  }

  async buscarId(id: number) {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new Error('404: Cliente não encontrado');
    return cliente;
  }

  async atualizar(id: number, dados: ClienteUpdateDTO) {
    await this.buscarId(id); // Garante que o recurso existe
    return await prisma.cliente.update({ where: { id }, data: dados });
  }

  async deletar(id: number) {
    await this.buscarId(id); // Garante que o recurso existe
    return await prisma.cliente.delete({ where: { id } });
  }
}