import React, { useState, useEffect } from "react";
import style from "./ModalEditarCategoria.module.css";
import CategoriaApi from '../../services/CategoriaApi';
import Alerta from '../../components/Alerta/Alerta';

const ModalEditarCategoria = ({ visivel, fecharModal, atualizarCategorias, categoriaId }) => {
    const [categoria, setCategoria] = useState({
        id: categoriaId,
        nome: "",
    });

    const [erro, setErro] = useState(null);

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');

    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 10000);
    };

    useEffect(() => {
        if (visivel) {
            const buscarDadosCategoria = async () => {
                try {
                    const dadosCategoria = await CategoriaApi.obterAsync(categoriaId);

                    setCategoria({
                        id: dadosCategoria.id,
                        nome: dadosCategoria.nome
                    });
                } catch (error) {
                    console.error('Erro ao buscar dados da categoria:');
                    setMensagemAlerta(`Erro ao buscar dados da categoria: ${error.response.data}`);
                    setTipoAlerta('danger');
                    exibirAlerta(true);
                }
            };

            buscarDadosCategoria();
        }
    }, [visivel, categoriaId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria({ ...categoria, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CategoriaApi.AtualizarAsync(
                categoria.id,
                categoria.nome
            );

            fecharModal();
            atualizarCategorias();
            setMensagemAlerta(`Categoria  atualizada com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
        } catch (error) {
            setMensagemAlerta(`Erro ao atualizar categoria: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    if (!visivel) return null;

    return (
        <div className={style.overlayModalEditar}>
            <Alerta
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
            <div className={style.modal_containerEditar}>
                <div className={style.cabecalhoModalEditar}>
                    <h2>Editar categoria </h2>
                    <button className={style.botaoFecharEditar} onClick={fecharModal}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={style.grupoFormularioEditar}>
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={categoria.nome}
                            onChange={handleChange}
                            placeholder="Digite o nome"
                            required
                        />
                    </div>
                    <div className={style.rodapeModalEditar}>
                        <button
                            type="button"
                            className={style.botaoCancelarEditar}
                            onClick={fecharModal}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className={style.botaoSalvarEditar}>
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEditarCategoria;
