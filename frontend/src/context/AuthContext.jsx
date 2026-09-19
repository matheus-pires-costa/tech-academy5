import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [logado, setLogado] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const dadosUsuario = localStorage.getItem('usuario');
    
    if (token && dadosUsuario) {
      setUsuario(JSON.parse(dadosUsuario));
      setLogado(true);
    }
  }, []);

  
  const login = (token, dados) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(dados));
    setUsuario(dados);
    setLogado(true);
  };

  
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