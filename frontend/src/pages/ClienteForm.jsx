import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ClienteForm() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const clienteEmEdicao = location.state?.cliente;

  useEffect(() => {
    if (clienteEmEdicao) {
      setNome(clienteEmEdicao.nome);
      setTelefone(clienteEmEdicao.telefone);
    }
  }, [clienteEmEdicao]);

  const handleSubmeter = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = clienteEmEdicao ? `https://cn-estetica-api.onrender.com/clientes/${clienteEmEdicao.id}` : 'https://cn-estetica-api.onrender.com/clientes';
    const metodo = clienteEmEdicao ? 'PUT' : 'POST';

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ nome, telefone })
      });

      if (resposta.ok) {
        alert('Salvo com sucesso!');
        navigate('/clientes'); 
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
          {clienteEmEdicao ? 'Editar Cliente' : 'Novo Cliente'}
        </h4>
        <form onSubmit={handleSubmeter} className="row g-3">
          <div className="col-12">
            <label className="form-label text-cn-roxo fw-semibold">Nome Completo</label>
            <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label text-cn-roxo fw-semibold">Telefone</label>
            <input type="text" className="form-control" placeholder="(11) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          </div>
          <div className="col-12 d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-cn-roxo fw-bold flex-grow-1">Salvar</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/clientes')}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClienteForm;