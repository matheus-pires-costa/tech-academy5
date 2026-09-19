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

export type ProcedimentoUpdateDTO = Partial<ProcedimentoDTO>;