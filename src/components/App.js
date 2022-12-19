import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './globalStyles';
import Login from "./Login";
import { useState } from 'react';
import { UsuarioContext } from './UsuarioContext.js';
import { HabitosConcluidosContext } from './HabitosConcluidosContext.js';
import Hoje from "./Hoje";
import Habitos from "./Habitos";
import Historico from "./Historico";
import Cadastro from "./Cadastro";
import Topo from "./Topo";
import Menu from "./Menu";

export default function App() {
  const [usuario, setUsuario] = useState({ email: "", id: "", image: "", name: "", password: "", token: "" });
  const [habitosConcluidos, setHabitosConcluidos] = useState({});
  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      <HabitosConcluidosContext.Provider value={{ habitosConcluidos, setHabitosConcluidos }}>
        <BrowserRouter>
          <GlobalStyle />
          <Topo />
          <Menu />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/hoje" element={<Hoje />} />
            <Route path="/habitos" element={<Habitos />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </BrowserRouter>
      </HabitosConcluidosContext.Provider>
    </UsuarioContext.Provider>
  );
}

