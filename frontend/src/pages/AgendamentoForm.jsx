import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AgendamentoForm() {
  const [clientes, setClientes] = useState([]);
  const [procedimentos, setProcedimentos] = useState([]);
  
  const [clienteId, setClienteId] = useState('');
  const [procedimentoId, setProcedimentoId] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [status, setStatus] = useState('Pendente');

  const navigate = useNavigate();
  const location = useLocation();
  const agendamentoEmEdicao = location.state?.agendamento;

  useEffect(() => {
    carregarListas();
    if (agendamentoEmEdicao) {
      setClienteId(agendamentoEmEdicao.clienteId);
      setProcedimentoId(agendamentoEmEdicao.procedimentoId);
      setStatus(agendamentoEmEdicao.status);
      
      
      if (agendamentoEmEdicao.dataHora) {
        const dataFormatada = new Date(agendamentoEmEdicao.dataHora).toISOString().slice(0, 16);
        setDataHora(dataFormatada);
      }
    }
  }, [agendamentoEmEdicao]);

  const carregarListas = async () => {
    const token = localStorage.getItem('token');
    
    const resClientes = await fetch('https://cn-estetica-api.onrender.com/clientes?limite=100', { headers: { 'Authorization': `Bearer ${token}` } });
    const resProcedimentos = await fetch('https://cn-estetica-api.onrender.com/procedimentos?limite=100', { headers: { 'Authorization': `Bearer ${token}` } });
    
    if (resClientes.ok) {
      const resultadoClientes = await resClientes.json();
      setClientes(resultadoClientes.dados); 
    }
    
    if (resProcedimentos.ok) {
      const resultadoProced = await resProcedimentos.json();
      setProcedimentos(resultadoProced.dados); 
    }
  };

  const handleSubmeter = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = agendamentoEmEdicao ? `https://cn-estetica-api.onrender.com/agendamentos/${agendamentoEmEdicao.id}` : 'https://cn-estetica-api.onrender.com/agendamentos';
    const metodo = agendamentoEmEdicao ? 'PUT' : 'POST';

    const bodyData = { 
        clienteId: parseInt(clienteId), 
        procedimentoId: parseInt(procedimentoId), 
        dataHora,
        status
    };

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(bodyData)
      });

      if (resposta.ok) {
        alert('Agendamento salvo com sucesso!');
        navigate('/agendamentos');
      } else {
        alert('Erro ao salvar agendamento.');
      }
    } catch (error) {
      alert('Erro de conexão.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <div className="card p-4 shadow-sm card-estetica bg-white">
        <h4 className='text-cn-roxo fw-bold mb-4'>
          {agendamentoEmEdicao ? 'Editar Agendamento' : 'Novo Agendamento'}
        </h4>
        <form onSubmit={handleSubmeter} className="row g-3">
          
          <div className="col-md-6">
            <label className="form-label text-cn-roxo fw-semibold">Cliente</label>
            <select className="form-select" value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
              <option value="">Selecione um cliente...</option>
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label text-cn-roxo fw-semibold">Procedimento</label>
            <select className="form-select" value={procedimentoId} onChange={(e) => setProcedimentoId(e.target.value)} required>
              <option value="">Selecione um serviço...</option>
              {procedimentos.map(p => <option key={p.id} value={p.id}>{p.nome} (R$ {p.preco})</option>)}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label text-cn-roxo fw-semibold">Data e Hora</label>
            <input type="datetime-local" className="form-control" value={dataHora} onChange={(e) => setDataHora(e.target.value)} required />
          </div>

          <div className="col-md-6">
            <label className="form-label text-cn-roxo fw-semibold">Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pendente">Pendente</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="col-12 d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-cn-roxo fw-bold flex-grow-1">Salvar Agendamento</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/agendamentos')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgendamentoForm;