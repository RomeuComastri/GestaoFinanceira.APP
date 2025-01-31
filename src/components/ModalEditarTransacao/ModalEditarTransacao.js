import React, { useState, useEffect } from "react";
import style from "./ModalEditarTransacao.module.css";
import TransacaoApi from '../../services/TransacaoApi';
import CategoriaApi from '../../services/CategoriaApi';
import Alerta from '../../components/Alerta/Alerta';

const ModalEditarTransacao = ({ visivel, fecharModal, atualizarTransacoes, atualizarSaldo, transacaoId, usuarioId, tipoTransacao }) => {
    const [transacao, setTransacao] = useState({
        id: transacaoId,
        valor: "",
        descricao: "",
        data: "",
        categoriaId: "",
    });
    const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
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
            // Correção 1: Garantir que categorias sejam buscadas ao abrir o modal.
            const buscarCategorias = async () => {
                try {
                    const resposta = await CategoriaApi.listarAsync(usuarioId, true);
                    const categorias = resposta.filter(
                        (categoria) => categoria.tipo === tipoTransacao
                    );
                    setCategoriasFiltradas(categorias);
                } catch (erro) {
                    setMensagemAlerta(`Erro ao buscar dados da categoria`);
                    setTipoAlerta('danger');
                    exibirAlerta(true);
                }
            };

            // Correção 2: Buscar dados da transação e preencher os campos.
            const buscarDadosTransacao = async () => {
                try {
                    const dadosTransacao = await TransacaoApi.obterAsync(transacaoId);

                    setTransacao({
                        id: dadosTransacao.id,
                        valor: dadosTransacao.valor,
                        descricao: dadosTransacao.descricao,
                        data: dadosTransacao.data.split("T")[0],
                        categoriaId: dadosTransacao.categoriaId,
                    });
                } catch (error) {
                    setMensagemAlerta(`Erro ao buscar dados da transação`);
                    setTipoAlerta('danger');
                    exibirAlerta(true);
                }
            };

            buscarCategorias();
            buscarDadosTransacao();
        }
    }, [visivel, transacaoId, usuarioId]); // Correção 3: Adicionar dependências adequadas.

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransacao({ ...transacao, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await TransacaoApi.AtualizarAsync(
                transacao.id,
                transacao.valor,
                transacao.descricao,
                transacao.data,
                transacao.categoriaId
            );
            fecharModal();
            atualizarTransacoes();
            atualizarSaldo();
            setMensagemAlerta(`Transação atualizada com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
        } catch (error) {
            setMensagemAlerta(`Erro ao atualizar transação: ${error.response.data}`);
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
                    <h2>Editar transação</h2>
                    <button className={style.botaoFecharEditar} onClick={fecharModal}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className={style.formularioEditarTransacao}>
                    <div className={style.grupoFormularioEditar}>
                        <input
                            type="number"
                            name="valor"
                            value={transacao.valor}
                            onChange={handleChange}
                            placeholder="Digite o valor"
                            required
                        />
                    </div>
                    <div className={style.grupoFormularioEditar}>
                        <input
                            type="text"
                            name="descricao"
                            value={transacao.descricao}
                            onChange={handleChange}
                            placeholder="Digite a descrição"
                            required
                        />
                    </div>
                    <div className={style.grupoFormularioEditar}>
                        <input
                            type="date"
                            name="data"
                            value={transacao.data}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.grupoFormularioEditar}>
                        <select
                            name="categoriaId"
                            value={transacao.categoriaId}
                            onChange={handleChange}
                            required
                        >
                            <option className={style.selecaoCategoriaEditar} value="">Selecione uma categoria</option>
                            {categoriasFiltradas.length > 0 ? (
                                categoriasFiltradas.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Carregando categorias...</option>
                            )}
                        </select>
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

export default ModalEditarTransacao;
