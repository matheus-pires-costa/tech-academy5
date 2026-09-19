import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  const handleRegisto = async (e) => {
    e.preventDefault();
    setErro('');

    
    if (senha !== confirmarSenha) {
      setErro('As palavras-passe não coincidem.');
      return;
    }

    try {
      const resposta = await fetch('https://cn-estetica-api.onrender.com/usuarios/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, cpf, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert('Conta criada com sucesso! Pode fazer o login.');
        navigate('/'); 
      } else {
        
        setErro(dados.erro || 'Erro ao criar conta. Verifique os dados.');
      }
    } catch (error) {
      setErro('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '400px', borderColor: '#c5a059' }}>
        <h3 className="text-center text-cn-roxo fw-bold mb-4">Criar Conta</h3>
        
        {erro && <div className="alert alert-danger py-2">{erro}</div>}
        
        <form onSubmit={handleRegisto}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="CPF (Apenas números)" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Palavra-passe (Mín. 8, 1 Maiúscula, 1 Número)" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <div className="mb-4">
            <input type="password" className="form-control" placeholder="Confirmar Palavra-passe" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
          </div>
          
          <button type="submit" className="btn btn-cn-roxo w-100 fw-bold mb-3">Registar</button>
          
          <div className="text-center">
            <Link to="/" className="text-decoration-none text-muted">Já tem conta? Faça Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;