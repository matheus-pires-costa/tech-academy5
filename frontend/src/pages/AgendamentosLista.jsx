import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AgendamentosLista() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1); 
  const limite = 5;
  const navigate = useNavigate();

  useEffect(() => {
    carregarAgendamentos();
  }, [pagina]);

  const carregarAgendamentos = async () => {
    const token = localStorage.getItem('token');
    try {
      const resposta = await fetch(`http://localhost:3000/agendamentos?pagina=${pagina}&limite=${limite}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resposta.ok) {
        const resultado = await resposta.json();
        setAgendamentos(resultado.dados); 
        setTotalPaginas(resultado.paginas); 
      } else if (resposta.status === 401) {
        navigate('/');
      }
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Excluir este agendamento?')) return;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/agendamentos/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    carregarAgendamentos();
  };

  
  const formatarData = (dataIso) => {
    const data = new Date(dataIso);
    return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-cn-roxo fw-bold">Agenda da Clínica</h2>
        <button className="btn btn-cn-dourado shadow-sm" onClick={() => navigate('/agendamentos/novo')}>
          + Novo Agendamento
        </button>
      </div>

      <div className="card shadow-sm p-3 card-estetica bg-white">
        {agendamentos.length === 0 ? (
          <p className="text-muted text-center py-4">Nenhum agendamento marcado.</p>
        ) : (
          <table className="table table-hover mt-3 table-sm">
            <thead>
              <tr className="text-cn-roxo">
                <th>Data/Hora</th>
                <th>Cliente</th>
                <th>Procedimento</th>
                <th>Status</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map(ag => (
                <tr key={ag.id} className='align-middle'>
                  <td className="fw-bold">{formatarData(ag.dataHora)}</td>
                  {}
                  <td>{ag.cliente?.nome || 'Cliente Removido'}</td>
                  <td>{ag.procedimento?.nome || 'Procedimento Removido'}</td>
                  <td>
                    <span className={`badge ${ag.status === 'Confirmado' ? 'bg-success' : ag.status === 'Cancelado' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                      {ag.status}
                    </span>
                  </td>
                  <td className="text-center">
                      <button className="btn btn-sm btn-outline-secondary me-2 border-0" onClick={() => navigate(`/agendamentos/editar/${ag.id}`, { state: { agendamento: ag } })}>✏️ Editar</button>
                      <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeletar(ag.id)}>🗑️ Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-sm btn-outline-secondary" disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>⬅️ Anterior</button>
          <span className="text-cn-roxo fw-bold">Página {pagina} de {totalPaginas}</span>
          <button className="btn btn-sm btn-outline-secondary" disabled={pagina >= totalPaginas} onClick={() => setPagina(pagina + 1)}>Próxima ➡️</button>
        </div>
      </div>
    </div>
  );
}

export default AgendamentosLista;