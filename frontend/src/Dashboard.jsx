import { useState, useEffect } from 'react';

function Dashboard({ onLogout }) {
  const [clientes, setClientes] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  // Estado para controlar se estamos editando um cliente
  const [clienteEmEdicao, setClienteEmEdicao] = useState(null);

  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    const token = localStorage.getItem('token');
    try {
      const resposta = await fetch('http://localhost:3000/clientes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resposta.ok) {
        setClientes(await resposta.json());
      } else if (resposta.status === 401) {
        onLogout();
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Prepara o formulário para EDIÇÃO
  const iniciarEdicao = (cliente) => {
    setClienteEmEdicao(cliente);
    setNome(cliente.nome);
    setTelefone(cliente.telefone);
    setMostrarForm(true);
  };

  // Prepara o formulário para NOVA CRIAÇÃO
  const iniciarCriacao = () => {
    setClienteEmEdicao(null); // Limpa o estado de edição
    setNome('');
    setTelefone('');
    setMostrarForm(true);
  };

  // Cancela qualquer ação e esconde o formulário
  const cancelarAcao = () => {
    setClienteEmEdicao(null);
    setNome('');
    setTelefone('');
    setMostrarForm(false);
  };

  const handleSubmeterForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      let resposta;
      if (clienteEmEdicao) {
        // MODO EDIÇÃO: Envia PUT /clientes/:id
        resposta = await fetch(`http://localhost:3000/clientes/${clienteEmEdicao.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ nome, telefone })
        });
      } else {
        // MODO CRIAÇÃO: Envia POST /clientes
        resposta = await fetch('http://localhost:3000/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ nome, telefone })
        });
      }

      if (resposta.ok) {
        const clienteRetornado = await resposta.json();
        if (clienteEmEdicao) {
          // Atualiza na tabela sem precisar recarregar (mapeia o array e substitui o editado)
          setClientes(clientes.map(c => c.id === clienteEmEdicao.id ? clienteRetornado : c));
          alert('Cliente atualizado com sucesso!');
        } else {
          setClientes([...clientes, clienteRetornado]); // Adiciona na tabela instantaneamente
          alert('Cliente criado com sucesso!');
        }
        cancelarAcao(); // Limpa e esconde o form
      } else {
        alert('Erro ao processar cliente. Verifique os dados.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  const handleDeletar = async (id) => {
    // Confirmação para evitar exclusão acidental
    if (!window.confirm('Tem certeza que deseja excluir este cliente para sempre?')) return;

    const token = localStorage.getItem('token');
    try {
      const resposta = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (resposta.ok) {
        // Remove o cliente da tabela instantaneamente filtrando o array
        setClientes(clientes.filter(c => c.id !== id));
      } else {
        alert('Erro ao excluir cliente.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-cn-roxo px-4 shadow">
        <span className="navbar-brand mb-0 h1 fw-bold" style={{ color: '#c5a059' }}>
          ✨ CN Estética e Bem-Estar
        </span>
        <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Sair</button>
      </nav>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-cn-roxo fw-bold">Clientes Cadastrados</h2>
          <button
            className="btn btn-cn-dourado shadow-sm"
            onClick={mostrarForm ? cancelarAcao : iniciarCriacao}
          >
            {mostrarForm ? 'Cancelar' : '+ Novo Cliente'}
          </button>
        </div>

        {/* Formulário de Cadastro/Edição (Aparece ao clicar em Novo ou Editar) */}
        {mostrarForm && (
          <div className="card p-3 mb-4 shadow-sm border-0 card-estetica" style={{ backgroundColor: '#fdfbf7' }}>
            <h5 className='text-cn-roxo fw-semibold mb-3'>
              {clienteEmEdicao ? `Editando: ${clienteEmEdicao.nome}` : 'Novo Cadastro de Cliente'}
            </h5>
            <form onSubmit={handleSubmeterForm} className="row g-3 align-items-end">
              <div className="col-md-5">
                <label className="form-label text-cn-roxo fw-semibold">Nome Completo</label>
                <input type="text" className="form-control border-secondary" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="col-md-4">
                <label className="form-label text-cn-roxo fw-semibold">Telefone</label>
                <input type="text" className="form-control border-secondary" placeholder="(11) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
              </div>
              <div className="col-md-3 d-flex gap-2">
                <button type="submit" className="btn btn-cn-roxo fw-bold shadow-sm flex-grow-1">
                  {clienteEmEdicao ? 'Salvar Edição' : 'Criar Cliente'}
                </button>
                {clienteEmEdicao && (
                  <button type="button" className="btn btn-outline-secondary" onClick={cancelarAcao}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="card shadow-sm p-3 card-estetica bg-white">
          {clientes.length === 0 ? (
            <p className="text-muted mb-0 text-center py-4">Nenhum cliente cadastrado ainda.</p>
          ) : (
            <table className="table table-hover mt-3 table-sm">
              <thead>
                <tr className="text-cn-roxo">
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id} className='align-middle'>
                    <td className="fw-bold">{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.telefone}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2 border-0"
                        title="Editar"
                        onClick={() => iniciarEdicao(cliente)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger border-0"
                        title="Excluir"
                        onClick={() => handleDeletar(cliente.id)}
                      >
                        🗑️ Excluir
                      </button>
                    </td>
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