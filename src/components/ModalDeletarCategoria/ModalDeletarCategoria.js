import React, { useState, useEffect } from "react";
import style from "./ModalDeletarCategoria.module.css";
import CategoriaApi from '../../services/CategoriaApi';
import Alerta from '../../components/Alerta/Alerta';

const ModalDeletarCategoria = ({ visivel, fecharModal, categoriaId, atualizarCategorias }) => {


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
            await CategoriaApi.deletarCategoriaAsync(categoriaId)
            fecharModal();
            atualizarCategorias();
            setMensagemAlerta(`Categoria deletada com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
        } catch (error) {
            setMensagemAlerta(`Erro ao deletar categoria: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    if (!visivel) return null;

    return (
        <div className={style.overlayModalDeletarCategoria}>
            <Alerta
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
            <div className={style.modal_containerDeletarCategoria}>
                <div className={style.cabecalhoModalDeletarCategoria}>
                    <h2>Deseja deletar a categoria?</h2>
                    <button className={style.botaoFecharDeletarCategoria} onClick={fecharModal}>
                        &times;
                    </button>
                </div>
                <div className={style.rodapeModalDeletarCategoria}>
                    <button className={style.botaoCancelarDeletarCategoria} onClick={fecharModal}>
                        Cancelar
                    </button>
                    <button className={style.botaoConfirmarDeletarCategoria} onClick={handleDeletar}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ModalDeletarCategoria;
