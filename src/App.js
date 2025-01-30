import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Entrada } from '../src/pages/Entrada/Entrada';
import { Login } from '../src/pages/Login/Login';
import { Cadastro } from '../src/pages/Cadastro/Cadastro';
import { RecuperarSenha } from '../src/pages/RecuperarSenha/RecuperarSenha';
import { Transacao } from '../src/pages/Transacao/Transacao';
import { Categoria } from '../src/pages/Categoria/Categoria';
import { EditarUsuario } from '../src/pages/EditarUsuario/EditarUsuario';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Entrada />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/recuperarsenha' element={<RecuperarSenha />} />
        <Route path='/transacao' element={<ProtectedRoute><Transacao /></ProtectedRoute>} />
        <Route path='/categoria' element={<ProtectedRoute><Categoria /></ProtectedRoute>} />
        <Route path='/usuario/editar' element={<ProtectedRoute><EditarUsuario /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
