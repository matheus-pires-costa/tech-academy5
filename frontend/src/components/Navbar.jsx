import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); // Recarrega para limpar os estados e voltar ao Login
  };

  return (
    <nav className="navbar navbar-dark bg-cn-roxo px-4 shadow-sm mb-4">
      <span className="navbar-brand mb-0 h1 fw-bold" style={{ color: '#c5a059' }}>
        ✨ CN Estética e Bem-Estar
      </span>
      <div>
        {/* Trocamos o Link por um button com navigate, fica à prova de falhas */}
        <button 
          className="btn btn-outline-light btn-sm me-2" 
          onClick={() => navigate('/clientes')}
        >
          👥 Clientes
        </button>
        <button 
          className="btn btn-outline-danger btn-sm" 
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;