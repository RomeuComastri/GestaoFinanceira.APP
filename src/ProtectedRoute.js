import React from 'react';
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ children }) => {
    const usuarioId = localStorage.getItem('usuarioId');
    
    if (usuarioId === null) {
        return <Navigate to="/login" />;
    }

    return children;
};


export default ProtectedRoute;