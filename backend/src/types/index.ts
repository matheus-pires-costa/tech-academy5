export type ClienteDTO = {
  nome: string;
  telefone: string;
};

export type ClienteUpdateDTO = {
  nome?: string;
  telefone?: string;
};

export type ProcedimentoDTO = {
  nome: string;
  descricao?: string;
  preco: number;
  duracao: number;
};

export type AgendamentoDTO = {
  dataHora: string; // Vamos usar string para facilitar no frontend (formato ISO)
  status?: string;
  clienteId: number;
  procedimentoId: number;
};

export type UsuarioDTO = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
};

export type AgendamentoUpdateDTO = Partial<AgendamentoDTO>;

export type ProcedimentoUpdateDTO = Partial<ProcedimentoDTO>;