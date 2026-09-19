import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClientesLista from './pages/ClientesLista';
import ClienteForm from './pages/ClienteForm';
import ProcedimentosLista from './pages/ProcedimentosLista';
import ProcedimentoForm from './pages/ProcedimentoForm';

function App() {
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) setLogado(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const resposta = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const dados = await resposta.json();
      if (resposta.ok) {
        localStorage.setItem('token', dados.token);
        setLogado(true);
      } else {
        setErro(dados.erro || 'Credenciais inválidas');
      }
    } catch (error) { setErro('Erro de conexão.'); }
  };

  // Se NÃO estiver logado, exibe apenas a tela de Login
  if (!logado) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow card-estetica bg-white" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center mb-4 text-cn-roxo fw-bold">CN Estética e Bem-Estar</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-cn-roxo fw-semibold">E-mail</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-cn-roxo fw-semibold">Senha</label>
              <input type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            {erro && <div className="alert alert-danger p-2 text-center">{erro}</div>}
            <button type="submit" className="btn btn-cn-dourado w-100 mt-2">Entrar no Sistema</button>
          </form>
        </div>
      </div>
    );
  }

  // Se ESTIVER logado, exibe as rotas protegidas
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Redireciona a raiz para clientes */}
        <Route path="/" element={<Navigate to="/clientes" />} />
        <Route path="/clientes" element={<ClientesLista />} />
        <Route path="/clientes/novo" element={<ClienteForm />} />
        <Route path="/clientes/editar/:id" element={<ClienteForm />} />
        <Route path="/procedimentos" element={<ProcedimentosLista />} />
        <Route path="/procedimentos/novo" element={<ProcedimentoForm />} />
        <Route path="/procedimentos/editar/:id" element={<ProcedimentoForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;