import React, { useState, useEffect } from "react";
import style from "./ModalAdicionarCategoria.module.css";
import CategoriaApi from '../../services/CategoriaApi';
import TransacaoApi from '../../services/TransacaoApi';
import Alerta from '../../components/Alerta/Alerta';

const ModalAdicionarCategoria = ({ visivel, fecharModal, usuarioId, atualizarCategorias }) => {
    const [categoria, setCategoria] = useState({
        nome: "",
        tipo: "",
        usuarioId: usuarioId,
    });
    const [tipos, setTipos] = useState([]);

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
            const buscarTipos = async () => {
                try {
                    const resposta = await TransacaoApi.listarTipoTransacoesAsync();
                    setTipos(resposta);
                } catch (erro) {
                    setMensagemAlerta(`Erro ao buscar tipo de categorias`);
                    setTipoAlerta('danger');
                    exibirAlerta(true);
                }
            };

            buscarTipos();
        }
    }, [visivel]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria({ ...categoria, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CategoriaApi.criarAsync(
                categoria.tipo,
                categoria.nome,
                categoria.usuarioId
            );
            setMensagemAlerta(`Categoria adicionada com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
            setTimeout(() => {
                fecharModal();
                atualizarCategorias();
            }, 1000);
        } catch (error) {
            setMensagemAlerta(`Erro ao adicionar categoria: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    if (!visivel) return null;

    return (
        <div className={style.overlayModal}>
            <Alerta
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
            <div className={style.modal_container}>
                <div className={style.cabecalhoModal}>
                    <h2>Adicionar categoria</h2>
                    <button className={style.botaoFechar} onClick={fecharModal}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className={style.formularioAdicionarCategoria}>
                    <div className={style.grupoFormulario}>
                        <input
                            type="text"
                            name="nome"
                            value={categoria.nome}
                            onChange={handleChange}
                            placeholder="Digite o nome"
                            required
                        />
                    </div>
                    <div className={style.grupoFormulario}>
                        <select
                            name="tipo"
                            value={categoria.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option className={style.selecaoCategoria} value="">Selecione um tipo</option>
                            {tipos.length > 0 ? (
                                tipos.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.nome}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Carregando tipos...</option>
                            )}
                        </select>
                    </div>
                    <div className={style.rodapeModal}>
                        <button
                            type="button"
                            className={style.botaoCancelar}
                            onClick={fecharModal}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className={style.botaoSalvar}>
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ModalAdicionarCategoria;
