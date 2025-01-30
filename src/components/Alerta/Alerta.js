import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from './Alerta.module.css';

const Alerta = ({ tipo, mensagem, visivel, aoFechar }) => {
    if (!visivel) return null;

    const tipoClasse = {
        success: styles.success, // Sucesso (verde)
        danger: styles.danger, // Erro (vermelho)
        warning: styles.warning // Atenção (amarelo)
    };

    return (
        <Alert
            variant={tipo}
            onClose={aoFechar}
            dismissible
            className={`${styles.alertaFixo} ${tipoClasse[tipo] || ''}`} // Usando `className` corretamente
        >
            {mensagem}
        </Alert>
    );
};

export default Alerta;
