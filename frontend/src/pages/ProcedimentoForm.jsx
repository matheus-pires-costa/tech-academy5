import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ProcedimentoForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const procedimentoEmEdicao = location.state?.procedimento;

  useEffect(() => {
    if (procedimentoEmEdicao) {
      setNome(procedimentoEmEdicao.nome);
      setDescricao(procedimentoEmEdicao.descricao || '');
      setPreco(procedimentoEmEdicao.preco);
      setDuracao(procedimentoEmEdicao.duracao);
    }
  }, [procedimentoEmEdicao]);

  const handleSubmeter = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = procedimentoEmEdicao ? `http://localhost:3000/procedimentos/${procedimentoEmEdicao.id}` : 'http://localhost:3000/procedimentos';
    const metodo = procedimentoEmEdicao ? 'PUT' : 'POST';

    
    const bodyData = { 
        nome, 
        descricao, 
        preco: parseFloat(preco), 
        duracao: parseInt(duracao, 10) 
    };

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(bodyData)
      });

      if (resposta.ok) {
        alert('Salvo com sucesso!');
        navigate('/procedimentos');
      } else {
        alert('Erro ao salvar.');
      }
    } catch (error) {
      alert('Erro de conexão.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card p-4 shadow-sm card-estetica bg-white">
        <h4 className='text-cn-roxo fw-bold mb-4'>
          {procedimentoEmEdicao ? 'Editar Procedimento' : 'Novo Procedimento'}
        </h4>
        <form onSubmit={handleSubmeter} className="row g-3">
          <div className="col-12">
            <label className="form-label text-cn-roxo fw-semibold">Nome do Serviço (ex: Limpeza de Pele)</label>
            <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label text-cn-roxo fw-semibold">Descrição</label>
            <textarea className="form-control" rows="2" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-cn-roxo fw-semibold">Preço (R$)</label>
            <input type="number" step="0.01" className="form-control" value={preco} onChange={(e) => setPreco(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label text-cn-roxo fw-semibold">Duração (minutos)</label>
            <input type="number" className="form-control" value={duracao} onChange={(e) => setDuracao(e.target.value)} required />
          </div>
          <div className="col-12 d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-cn-roxo fw-bold flex-grow-1">Salvar</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/procedimentos')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProcedimentoForm;