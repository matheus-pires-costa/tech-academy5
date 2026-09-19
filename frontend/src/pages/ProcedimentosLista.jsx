import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProcedimentosLista() {
  const [procedimentos, setProcedimentos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1); 
  const limite = 5;
  const navigate = useNavigate();

  useEffect(() => {
    carregarProcedimentos();
  }, [pagina]);

  const carregarProcedimentos = async () => {
    const token = localStorage.getItem('token');
    try {
      const resposta = await fetch(`http://localhost:3000/procedimentos?pagina=${pagina}&limite=${limite}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resposta.ok) {
        const resultado = await resposta.json();
        setProcedimentos(resultado.dados); 
        setTotalPaginas(resultado.paginas); 
      } else if (resposta.status === 401) {
        navigate('/');
      }
    } catch (error) {
      console.error("Erro ao buscar procedimentos:", error);
    }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Excluir este procedimento?')) return;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/procedimentos/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    carregarProcedimentos();
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-cn-roxo fw-bold">Procedimentos Oferecidos</h2>
        <button className="btn btn-cn-dourado shadow-sm" onClick={() => navigate('/procedimentos/novo')}>
          + Novo Procedimento
        </button>
      </div>

      <div className="card shadow-sm p-3 card-estetica bg-white">
        {procedimentos.length === 0 ? (
          <p className="text-muted text-center py-4">Nenhum procedimento cadastrado.</p>
        ) : (
          <table className="table table-hover mt-3 table-sm">
            <thead>
              <tr className="text-cn-roxo"><th>ID</th><th>Nome</th><th>Preço</th><th>Duração (min)</th><th className="text-center">Ações</th></tr>
            </thead>
            <tbody>
              {procedimentos.map(p => (
                <tr key={p.id} className='align-middle'>
                  <td className="fw-bold">{p.id}</td>
                  <td>{p.nome}</td>
                  <td>R$ {p.preco.toFixed(2)}</td>
                  <td>{p.duracao} min</td>
                  <td className="text-center">
                      <button className="btn btn-sm btn-outline-secondary me-2 border-0" onClick={() => navigate(`/procedimentos/editar/${p.id}`, { state: { procedimento: p } })}>✏️ Editar</button>
                      <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeletar(p.id)}>🗑️ Excluir</button>
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

export default ProcedimentosLista;