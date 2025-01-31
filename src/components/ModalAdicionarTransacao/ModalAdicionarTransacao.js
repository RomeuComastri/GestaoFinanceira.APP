import React, { useState, useEffect } from "react";
import style from "./ModalAdicionarTransacao.module.css";
import CategoriaApi from '../../services/CategoriaApi';
import TransacaoApi from '../../services/TransacaoApi';
import Alerta from '../../components/Alerta/Alerta';

const ModalAdicionarTransacao = ({ visivel, fecharModal, tipoTransacao, usuarioId, atualizarTransacoes, atualizarSaldo }) => {
    const [transacao, setTransacao] = useState({
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
            const buscarCategorias = async () => {
                try {
                    const resposta = await CategoriaApi.listarAsync(usuarioId, true);
                    const categorias = resposta.filter(
                        (categoria) => categoria.tipo === tipoTransacao
                    );
                    setCategoriasFiltradas(categorias);
                } catch (error) {
                    setMensagemAlerta(`Erro ao carregar categorias: ${error.response.data}`);
                    setTipoAlerta('danger');
                    exibirAlerta(true);
                }
            };

            buscarCategorias();
        }
    }, [visivel, tipoTransacao]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransacao({ ...transacao, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await TransacaoApi.criarAsync(
                transacao.valor,
                transacao.descricao,
                transacao.data,
                transacao.categoriaId
            );
            fecharModal();
            atualizarTransacoes();
            atualizarSaldo();
            setMensagemAlerta(`Transação adicionada com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
            
        } catch (error) {
            setMensagemAlerta(`Erro ao adicionar transação: ${error.response.data}`);
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
                    <h2>Adicionar {tipoTransacao === 1 ? "receita" : "despesa"}</h2>
                    <button className={style.botaoFechar} onClick={fecharModal}>
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className={style.formularioAdicionarTransacao}>
                    <div className={style.grupoFormulario}>
                        <input
                            type="number"
                            name="valor"
                            value={transacao.valor}
                            onChange={handleChange}
                            placeholder="Digite o valor"
                            required
                        />
                    </div>
                    <div className={style.grupoFormulario}>
                        <input
                            type="text"
                            name="descricao"
                            value={transacao.descricao}
                            onChange={handleChange}
                            placeholder="Digite a descrição"
                            required
                        />
                    </div>
                    <div className={style.grupoFormulario}>
                        <input
                            type="date"
                            name="data"
                            value={transacao.data}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={style.grupoFormulario}>
                        <select
                            name="categoriaId"
                            value={transacao.categoriaId}
                            onChange={handleChange}
                            required
                        >
                            <option className={style.selecaoCategoria} value="">Selecione uma categoria</option>
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

export default ModalAdicionarTransacao;
