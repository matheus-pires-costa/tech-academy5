import { useState, useEffect } from 'react';

function Dashboard({ onLogout }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Quando a tela carregar, busca os clientes na API
    const carregarClientes = async () => {
      const token = localStorage.getItem('token');
      try {
        const resposta = await fetch('http://localhost:3000/clientes', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resposta.ok) {
          const dados = await resposta.json();
          setClientes(dados);
        } else {
          if (resposta.status === 401) onLogout(); // Se o token for inválido, desloga
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
    
    carregarClientes();
  }, [onLogout]);

return (
    <div>
      {/* Barra de Navegação Roxa */}
      <nav className="navbar navbar-dark bg-cn-roxo px-4 shadow">
        <span className="navbar-brand mb-0 h1 fw-bold" style={{ color: '#c5a059' }}>
          ✨ CN Estética e Bem-Estar
        </span>
        <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Sair</button>
      </nav>

      {/* Conteúdo Principal */}
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-cn-roxo fw-bold">Clientes Cadastrados</h2>
          <button className="btn btn-cn-dourado">+ Novo Cliente</button>
        </div>
        
        <div className="card shadow-sm p-3 card-estetica bg-white">
          {clientes.length === 0 ? (
            <p className="text-muted mb-0 text-center py-4">Nenhum cliente cadastrado ainda. O banco está zerado!</p>
          ) : (
            <table className="table table-hover mt-3">
              <thead>
                <tr className="text-cn-roxo">
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td className="fw-bold">{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.telefone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;