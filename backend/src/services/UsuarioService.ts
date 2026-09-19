import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UsuarioDTO } from '../types';

const prisma = new PrismaClient();

export class UsuarioService {
  async cadastrar(dados: UsuarioDTO) {
    this.validarCampos(dados);
    
    const senhaCriptografada = await bcrypt.hash(dados.senha, 10);
    return await prisma.usuario.create({
      data: { ...dados, senha: senhaCriptografada }
    });
  }

  async atualizar(id: number, dados: { nome: string; senha: string; cpf: string }) {
    if (!dados.nome || !dados.senha || !dados.cpf) throw new Error('Campos obrigatórios em falta');
    
    if (dados.cpf.replace(/\D/g, '').length !== 11) throw new Error('O CPF deve ter exatos 11 números');
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(dados.senha)) throw new Error('A senha deve ter 8+ caracteres, 1 maiúscula e 1 número');

    const senhaCriptografada = await bcrypt.hash(dados.senha, 10);
    
    return await prisma.usuario.update({
      where: { id },
      data: { nome: dados.nome, cpf: dados.cpf, senha: senhaCriptografada }
    });
  }

  private validarCampos(d: UsuarioDTO) {
    if (!d.nome || !d.email || !d.senha || !d.cpf) throw new Error('Todos os campos são obrigatórios');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) throw new Error('E-mail em formato inválido');
    if (d.cpf.replace(/\D/g, '').length !== 11) throw new Error('O CPF deve ter exatos 11 números');
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(d.senha)) throw new Error('A senha deve ter 8+ caracteres, 1 maiúscula e 1 número');
  }
}