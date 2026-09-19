import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import ClientesLista from './pages/ClientesLista';
import ClienteForm from './pages/ClienteForm';
import ProcedimentosLista from './pages/ProcedimentosLista';
import ProcedimentoForm from './pages/ProcedimentoForm';
import AgendamentosLista from './pages/AgendamentosLista';
import AgendamentoForm from './pages/AgendamentoForm';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import { useState } from 'react';


function Rotas() {
  const { logado } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {logado && <Navbar />}
      <Routes>
        {!logado ? (
          <>
            <Route path="/" element={<TelaLogin />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/clientes" />} />
            <Route path="/clientes" element={<ClientesLista />} />
            <Route path="/clientes/novo" element={<ClienteForm />} />
            <Route path="/clientes/editar/:id" element={<ClienteForm />} />
            <Route path="/procedimentos" element={<ProcedimentosLista />} />
            <Route path="/procedimentos/novo" element={<ProcedimentoForm />} />
            <Route path="/procedimentos/editar/:id" element={<ProcedimentoForm />} />
            <Route path="/agendamentos" element={<AgendamentosLista />} />
            <Route path="/agendamentos/novo" element={<AgendamentoForm />} />
            <Route path="/agendamentos/editar/:id" element={<AgendamentoForm />} />
            <Route path="/cadastro" element={<Navigate to="/clientes" />} />
            <Route path="/perfil" element={<Perfil />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useContext(AuthContext); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const resposta = await fetch('https://cn-estetica-api.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const dados = await resposta.json();
      if (resposta.ok) {
        
        login(dados.token, dados.usuario || { nome: 'Administrador' }); 
      } else {
        setErro(dados.erro || 'Credenciais inválidas');
      }
    } catch (error) { setErro('Erro de conexão.'); }
  };

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
            <label className="form-label text-cn-roxo fw-semibold">Palavra-passe</label>
            <input type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          {erro && <div className="alert alert-danger p-2 text-center">{erro}</div>}
          <button type="submit" className="btn btn-cn-dourado w-100 mt-2">Entrar no Sistema</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/cadastro" className="text-decoration-none">Não tem conta? Registe-se aqui</Link>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}