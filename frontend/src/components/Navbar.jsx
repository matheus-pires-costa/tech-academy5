import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { usuario, logout } = useContext(AuthContext);

  const handleSair = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-cn-roxo px-4 shadow-sm mb-4">
      <span className="navbar-brand fw-bold">CN Estética</span>

      <div className="d-flex ms-auto align-items-center">
        {/* Aqui usamos o contexto global! */}
        <span className="text-white me-4">Olá, <strong>{usuario?.nome || 'Admin'}</strong>!</span>

        <button className="btn btn-outline-light btn-sm me-4" onClick={() => navigate('/perfil')}>
          ⚙️ Perfil
        </button>
        <button className="btn btn-outline-light btn-sm me-2" onClick={() => navigate('/clientes')}>👥 Clientes</button>
        <button className="btn btn-outline-light btn-sm me-2" onClick={() => navigate('/procedimentos')}>💉 Procedimentos</button>
        <button className="btn btn-outline-light btn-sm me-3" onClick={() => navigate('/agendamentos')}>📅 Agendamentos</button>

        <button className="btn btn-danger btn-sm fw-bold" onClick={handleSair}>Sair</button>
      </div>
    </nav>
  );
}

export default Navbar;