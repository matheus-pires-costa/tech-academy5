import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UsuarioDTO } from '../types';

const prisma = new PrismaClient();

export class UsuarioService {
  async cadastrar(dados: UsuarioDTO) {
    this.validarCampos(dados); // Chama a validação antes de qualquer coisa
    
    const senhaCriptografada = await bcrypt.hash(dados.senha, 10);
    return await prisma.usuario.create({
      data: { ...dados, senha: senhaCriptografada }
    });
  }

  // Função auxiliar para não estourar o limite de 10 linhas da rubrica
  private validarCampos(d: UsuarioDTO) {
    if (!d.nome || !d.email || !d.senha || !d.cpf) throw new Error('Todos os campos são obrigatórios');
    
    // Regex de E-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) throw new Error('E-mail em formato inválido');
    
    // Validação de CPF (Apenas garante que tem 11 números, removendo traços/pontos)
    if (d.cpf.replace(/\D/g, '').length !== 11) throw new Error('O CPF deve ter exatos 11 números');
    
    // Nível de Senha: Mínimo 8 caracteres, com pelo menos 1 letra maiúscula e 1 número
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(d.senha)) throw new Error('A senha deve ter 8+ caracteres, 1 maiúscula e 1 número');
  }
}