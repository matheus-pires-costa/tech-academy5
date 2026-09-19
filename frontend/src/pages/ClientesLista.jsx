import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientesLista() {
  const [clientes, setClientes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1); 
  const limite = 5; 
  const navigate = useNavigate();

  useEffect(() => {
    carregarClientes();
  }, [pagina]); 

  const carregarClientes = async () => {
    const token = localStorage.getItem('token');
    try {
      const resposta = await fetch(`http://localhost:3000/clientes?pagina=${pagina}&limite=${limite}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resposta.ok) {
        const resultado = await resposta.json();
        setClientes(resultado.dados); 
        setTotalPaginas(resultado.paginas); 
      } else if (resposta.status === 401) {
        navigate('/');
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Excluir este cliente?')) return;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/clientes/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
    carregarClientes(); 
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-cn-roxo fw-bold">Clientes Cadastrados</h2>
        <button className="btn btn-cn-dourado shadow-sm" onClick={() => navigate('/clientes/novo')}>
          + Novo Cliente
        </button>
      </div>

      <div className="card shadow-sm p-3 card-estetica bg-white">
        {clientes.length === 0 ? (
          <p className="text-muted text-center py-4">Nenhum cliente nesta página.</p>
        ) : (
          <table className="table table-hover mt-3 table-sm">
            <thead>
              <tr className="text-cn-roxo"><th>ID</th><th>Nome</th><th>Telefone</th><th className="text-center">Ações</th></tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id} className='align-middle'>
                  <td className="fw-bold">{c.id}</td><td>{c.nome}</td><td>{c.telefone}</td>
                  <td className="text-center">
                      <button className="btn btn-sm btn-outline-secondary me-2 border-0" onClick={() => navigate(`/clientes/editar/${c.id}`, { state: { cliente: c } })}>✏️ Editar</button>
                      <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDeletar(c.id)}>🗑️ Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-sm btn-outline-secondary" disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
            ⬅️ Anterior
          </button>
          <span className="text-cn-roxo fw-bold">Página {pagina} de {totalPaginas}</span>
          <button className="btn btn-sm btn-outline-secondary" disabled={pagina >= totalPaginas} onClick={() => setPagina(pagina + 1)}>
            Próxima ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientesLista;