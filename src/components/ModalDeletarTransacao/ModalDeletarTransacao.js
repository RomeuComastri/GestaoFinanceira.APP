import React, { useState, useEffect } from "react";
import style from "./ModalDeletarTransacao.module.css";
import TransacaoApi from '../../services/TransacaoApi';
import Alerta from '../../components/Alerta/Alerta';

const ModalDeletarTransacao = ({ visivel, fecharModal, transacaoId, atualizarTransacoes, atualizarSaldo }) => {


    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');

    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 10000);
    };

    const handleDeletar = async () => {
        try {
            await TransacaoApi.deletarTransacaoAsync(transacaoId);
            fecharModal();
            atualizarTransacoes();
            atualizarSaldo();
            setMensagemAlerta(`Transação deletada com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
        } catch (error) {
            setMensagemAlerta(`Erro ao deletar transação: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    if (!visivel) return null;

    return (
        <div className={style.overlayModalDeletar}>
            <Alerta
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
            <div className={style.modal_containerDeletar}>
                <div className={style.cabecalhoModalDeletar}>
                    <h2>Deletar transação</h2>
                    <button className={style.botaoFecharDeletar} onClick={fecharModal}>
                        &times;
                    </button>
                </div>
                <div className={style.rodapeModalDeletar}>
                    <button className={style.botaoCancelarDeletar} onClick={fecharModal}>
                        Cancelar
                    </button>
                    <button className={style.botaoConfirmarDeletar} onClick={handleDeletar}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ModalDeletarTransacao;
