import { createContext, useState, useEffect } from 'react';

// Cria o contexto global
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [logado, setLogado] = useState(false);

  // Assim que o site carrega, verifica se o Matheus (ou outro utilizador) já tem sessão iniciada
  useEffect(() => {
    const token = localStorage.getItem('token');
    const dadosUsuario = localStorage.getItem('usuario');
    
    if (token && dadosUsuario) {
      setUsuario(JSON.parse(dadosUsuario));
      setLogado(true);
    }
  }, []);

  // Função centralizada para iniciar sessão
  const login = (token, dados) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(dados));
    setUsuario(dados);
    setLogado(true);
  };

  // Função centralizada para terminar sessão
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    setLogado(false);
  };

  return (
    <AuthContext.Provider value={{ usuario, logado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}