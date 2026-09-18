import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Validators } from '../utils/validators';
import { CadastroUsuarioDTO } from '../types';

const prisma = new PrismaClient();

export class UsuarioService {
  async cadastrar(dados: CadastroUsuarioDTO) {
    this.validar(dados);
    const senhaHash = await bcrypt.hash(dados.senha, 10);
    return await prisma.usuario.create({
      data: { ...dados, senha: senhaHash }
    });
  }

  private validar(dados: CadastroUsuarioDTO) {
    if (!Validators.isEmailValid(dados.email)) throw new Error('E-mail inválido');
    if (!Validators.isPasswordStrong(dados.senha)) throw new Error('Senha fraca');
    if (!Validators.isCpfValid(dados.cpf)) throw new Error('CPF inválido');
  }
}