import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './globalStyles';
import Login from "./Login";
import { useState } from 'react';
import { UsuarioContext } from './UsuarioContext.js';
import Hoje from "./Hoje";
import Cadastro from "./Cadastro";
export default function App() {
  const [usuario, setUsuario] = useState({email: "", password: ""});
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
          <Route path="/" element={
            <UsuarioContext.Provider value={{usuario, setUsuario}}>
              <Login />
            </UsuarioContext.Provider>
          } />
          <Route path="/hoje" element={
            <UsuarioContext.Provider value={{usuario, setUsuario}}>
              <Hoje />
            </UsuarioContext.Provider>
          } />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    </BrowserRouter>
    
  );
}