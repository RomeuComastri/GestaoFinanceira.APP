import React from 'react';
import { Navigate } from "react-router-dom";
import UsuarioApi from './services/UsuarioApi';



const ProtectedRoute = ({ children }) => {
    console.log("Verificando autenticação...");
    const usuarioId = localStorage.getItem('usuarioId');
    console.log("Usuário ID:", usuarioId);
    
    if (usuarioId === null) {
        console.log("Usuário não autenticado. Redirecionando...");
        return <Navigate to="/login" />;
    }

    return children;
};


export default ProtectedRoute;