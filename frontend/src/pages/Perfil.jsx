import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Perfil() {
  const { usuario, login } = useContext(AuthContext);

  
  const [nome, setNome] = useState(usuario?.nome || '');
  const [email] = useState(usuario?.email || ''); 
  const [cpf, setCpf] = useState(usuario?.cpf || '');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const handleAtualizar = async (e) => {
    e.preventDefault();
    setMensagem({ texto: '', tipo: '' });

    if (senha !== confirmarSenha) {
      return setMensagem({ texto: 'As palavras-passe não coincidem.', tipo: 'danger' });
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha)) {
      return setMensagem({ texto: 'A palavra-passe deve ter 8+ caracteres, 1 maiúscula e 1 número.', tipo: 'danger' });
    }

    try {
      const token = localStorage.getItem('token');
      const id = usuario?.id; 

      const resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ nome, cpf, senha }) 
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem({ texto: 'Perfil atualizado com sucesso!', tipo: 'success' });
        login(token, { ...usuario, nome, email, cpf }); 
        setSenha('');
        setConfirmarSenha('');
      } else {
        setMensagem({ texto: dados.erro || 'Erro ao atualizar perfil.', tipo: 'danger' });
      }
    } catch (error) {
      setMensagem({ texto: 'Erro de conexão.', tipo: 'danger' });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0" style={{ borderTop: '4px solid #c5a059' }}>
            <div className="card-body p-4">
              <h3 className="text-center text-cn-roxo fw-bold mb-4">O Meu Perfil</h3>
              
              {mensagem.texto && (
                <div className={`alert alert-${mensagem.tipo} py-2 text-center`}>
                  {mensagem.texto}
                </div>
              )}

              <form onSubmit={handleAtualizar}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nome Completo</label>
                  <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">E-mail (Não é possível alterar)</label>
                  <input type="email" className="form-control bg-light" value={email} disabled />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">CPF</label>
                  <input type="text" className="form-control" placeholder="Apenas números" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Nova Senha</label>
                  <input type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Confirmar Nova Senha</label>
                  <input type="password" className="form-control" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-cn-dourado w-100 fw-bold">Guardar Alterações</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;