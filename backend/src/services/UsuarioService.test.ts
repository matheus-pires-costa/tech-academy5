
import { UsuarioService } from './UsuarioService';
import bcrypt from 'bcrypt';


jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    usuario: {
      create: jest.fn().mockResolvedValue({ id: 1, nome: 'Teste', email: 'teste@teste.com' }),
      update: jest.fn().mockResolvedValue({ id: 1, nome: 'Teste Editado' }),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});


jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('senha_criptografada'),
}));

describe('UsuarioService - Testes Unitários', () => {
  let service: UsuarioService;

  beforeEach(() => {
    service = new UsuarioService();
  });

  it('Não deve permitir cadastro com CPF menor que 11 dígitos', async () => {
    const dados = { nome: 'Matheus', email: 'matheus@teste.com', senha: 'SenhaForte123', cpf: '123' };
    await expect(service.cadastrar(dados)).rejects.toThrow('O CPF deve ter exatos 11 números');
  });

  it('Não deve permitir cadastro com senha fraca', async () => {
    const dados = { nome: 'Matheus', email: 'matheus@teste.com', senha: 'fraca', cpf: '12345678901' };
    await expect(service.cadastrar(dados)).rejects.toThrow('A senha deve ter 8+ caracteres, 1 maiúscula e 1 número');
  });

  it('Deve cadastrar um usuário com sucesso quando os dados são válidos', async () => {
    const dados = { nome: 'Matheus', email: 'matheus@teste.com', senha: 'SenhaForte123', cpf: '12345678901' };
    const resultado = await service.cadastrar(dados);
    expect(resultado).toHaveProperty('id');
  });

  it('Não deve permitir atualização de perfil sem os dados obrigatórios', async () => {
    const dados = { nome: '', senha: 'SenhaForte123', cpf: '12345678901' };
    await expect(service.atualizar(1, dados)).rejects.toThrow('Campos obrigatórios em falta');
  });
});