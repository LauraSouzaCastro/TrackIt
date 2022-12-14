import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './globalStyles';
import Login from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>
    
  );
}