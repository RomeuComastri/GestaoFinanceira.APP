import style from './Transacao.module.css';
import { TopbarPrincipal } from '../../components/TopbarPrincipal/TopbarPrincipal';
import { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import RelatorioApi from '../../services/RelatorioApi';
import { GoFilter } from "react-icons/go";
import PieChart from '../../components/Grafico/Grafico';
import ModalAdicionarTransacao from '../../components/ModalAdicionarTransacao/ModalAdicionarTransacao';
import TransacaoApi from '../../services/TransacaoApi';
import CategoriaApi from '../../services/CategoriaApi';
import ModalDeletarTransacao from '../../components/ModalDeletarTransacao/ModalDeletarTransacao';
import ModalEditarTransacao from '../../components/ModalEditarTransacao/ModalEditarTransacao';
import Alerta from '../../components/Alerta/Alerta';

export function Transacao() {
    const [transacoesFiltradas, setTransacoesFiltradas] = useState([]);
    const [transacaoSelecionada, setTransacaoSelecionada] = useState('');
    const [saldoObtido, setSaldoObtido] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [isModalDeletarOpen, setIsModalDeletarOpen] = useState(false);
    const [isModalFiltroOpen, setIsModalFiltroOpen] = useState(false);
    const [tipoTransacao, setTipoTransacao] = useState(null);
    const [tipos, setTipos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');

    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 10000);
    };

    const usuarioId = localStorage.getItem('usuarioId');

    const [filtro, setFiltro] = useState({
        usuarioId: usuarioId,
        tipo: "",
        categoriaId: "",
        dataInicio: "",
        dataFim: ""
    });

    const handleSubmitFiltro = (e) => {
        e.preventDefault();
        carregarTransacoesFiltradas();
        obterSaldoTotalAsync();
        fecharModalFiltrar();
    };

    const handleClickFiltrar = () => {
        setIsModalFiltroOpen(true);
    };

    const fecharModalFiltrar = () => {
        setIsModalFiltroOpen(false);
    };

    const handleClickDeletar = (transacao) => {
        setTransacaoSelecionada(transacao);
        setIsModalDeletarOpen(true);
    };

    const handleClickEditar = (transacao) => {
        setTransacaoSelecionada(transacao);
        setIsModalEditarOpen(true);
    };

    const handleClickNovaReceita = () => {
        setTipoTransacao(1);
        setIsModalOpen(true);
    };

    const handleClickNovaDespesa = () => {
        setTipoTransacao(0);
        setIsModalOpen(true);
    };

    async function obterSaldoTotalAsync() {
        try {
            const saldo = await RelatorioApi.obterSaldoTotalAsync(
                usuarioId,
                filtro.tipo || "",
                filtro.categoriaId || "",
                filtro.dataInicio || "",
                filtro.dataFim || ""
            );
            setSaldoObtido(saldo);
        } catch (error) {
            setMensagemAlerta(`Erro ao obter saldo`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    async function carregarTransacoesFiltradas() {
        try {
            const listaTranscoes = await RelatorioApi.obterTransacoesComFiltroAsync(
                usuarioId,
                filtro.tipo || "",
                filtro.categoriaId || "",
                filtro.dataInicio || "",
                filtro.dataFim || ""
            );
            setTransacoesFiltradas(listaTranscoes);
        } catch (error) {
            console.error("Erro ao carregar transações");
        }
    };

    async function carregarCategorias() {
        try {
            const listaCategorias = await CategoriaApi.listarAsync(usuarioId, true);
            const categoriasOrdenadas = listaCategorias.sort((a, b) => b.id - a.id);
            setCategorias(categoriasOrdenadas);
        } catch (error) {
            console.error("Erro ao carregar categorias");
        }
    };

    async function carregarTipos() {
        try {
            const listaTipos = await TransacaoApi.listarTipoTransacoesAsync();
            setTipos(listaTipos);
        } catch (error) {
            setMensagemAlerta(`Erro ao carregar tipos de transação`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    useEffect(() => {
        carregarCategorias();
        carregarTipos();
    }, []);

    useEffect(() => {
        obterSaldoTotalAsync();
        carregarTransacoesFiltradas();
    }, [filtro]);

    useEffect(() => {
        if (filtro.tipo) {
            const categoriasFiltradas = categorias.filter(categoria => categoria.tipo === Number(filtro.tipo));
            setCategoriasFiltradas(categoriasFiltradas);
        } else {
            setCategoriasFiltradas(categorias);
        }
    }, [filtro.tipo, categorias]);

    return (
        <TopbarPrincipal>
            <Alerta
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
            <div className={style.container_principal}>
                <div className={style.filtro}>
                    <div className={style.filtro_saldototal}>
                        Saldo: R$ {saldoObtido?.saldoTotal?.toFixed(2) || '0.00'}
                    </div>
                    <div>
                        <button onClick={handleClickFiltrar} className={style.filtro_tabela}>
                            <div className={style.fraseFiltro}>
                                Filtrar transações
                            </div>
                            <div className={style.icone_filtro}>
                                <GoFilter />
                            </div>
                        </button>
                    </div>
                    <div className={style.botoes}>
                        <button onClick={handleClickNovaReceita} className={style.filtro_botaoreceita}>
                            + Receita
                        </button>
                        <button onClick={handleClickNovaDespesa} className={style.filtro_botaodespesa}>
                            + Despesa
                        </button>
                    </div>
                    <div className={style.filtro_grafico}>
                        <PieChart totalReceitas={saldoObtido.totalReceitas} totalDespesas={saldoObtido.totalDespesas} />
                    </div>
                </div>
                <div className={style.containerPrincipalTabela}>
                    <div className={style.container_tabela}>
                        <table className={style.tabela}>
                            <thead className={style.tabela_cabecalho}>
                                <tr className={style.tabela_item_cabecalho}>
                                    <th>Tipo</th>
                                    <th>Valor</th>
                                    <th>Categoria</th>
                                    <th>Data</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                {transacoesFiltradas.length > 0 ? (
                                    transacoesFiltradas.map((transacao) => (
                                        <tr key={transacao.transacaoId}>
                                            <td>{transacao.tipo === 1 ? "Receita" : "Despesa"}</td>
                                            <td>R$ {transacao.valor ? transacao.valor.toFixed(2) : '0.00'}</td>
                                            <td>{transacao.nomeCategoria || 'Sem Categoria'}</td>
                                            <td>{transacao.data ? new Date(transacao.data).toLocaleDateString() : 'Data não disponível'}</td>
                                            <td>
                                                <button onClick={() => handleClickEditar(transacao)} className={style.editar}>
                                                    <MdEdit />
                                                </button>
                                                <button onClick={() => handleClickDeletar(transacao)} className={style.deletar}>
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">Nenhuma transação encontrada</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && (
                    <ModalAdicionarTransacao
                        visivel={isModalOpen}
                        tipoTransacao={tipoTransacao}
                        usuarioId={usuarioId}
                        fecharModal={() => setIsModalOpen(false)}
                        atualizarTransacoes={carregarTransacoesFiltradas}
                        atualizarSaldo={obterSaldoTotalAsync}
                    />
                )}

                {isModalDeletarOpen && (
                    <ModalDeletarTransacao
                        visivel={isModalDeletarOpen}
                        transacaoId={transacaoSelecionada.transacaoId}
                        fecharModal={() => setIsModalDeletarOpen(false)}
                        atualizarTransacoes={carregarTransacoesFiltradas}
                        atualizarSaldo={obterSaldoTotalAsync}
                    />
                )}

                {isModalEditarOpen && (
                    <ModalEditarTransacao
                        visivel={isModalEditarOpen}
                        fecharModal={() => setIsModalEditarOpen(false)}
                        atualizarTransacoes={carregarTransacoesFiltradas}
                        atualizarSaldo={obterSaldoTotalAsync}
                        transacaoId={transacaoSelecionada.transacaoId}
                        usuarioId={usuarioId}
                        tipoTransacao={transacaoSelecionada.tipo}
                    />
                )},

                {isModalFiltroOpen && (
                    <div className={style.overlayModalFiltrarTrancao}>
                        <div className={style.modal_containerFiltrarTrancao}>
                            <div className={style.cabecalhoModalFiltrarTrancao}>
                                <h2>Filtrar transações</h2>
                                <button className={style.botaoFecharFiltrarTrancao} onClick={fecharModalFiltrar}>
                                    &times;
                                </button>
                            </div>
                            <form onSubmit={handleSubmitFiltro}className={style.formularioFiltrarTrancao}>
                                <div className={style.grupoFormularioFiltrarTrancao}>
                                    <label>Tipo</label>
                                    <select
                                        name="tipo"
                                        value={filtro.tipo || ""}
                                        onChange={(e) => setFiltro({ ...filtro, tipo: e.target.value })}
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
                                <div className={style.grupoFormularioFiltrarTrancao}>
                                    <label>Categoria</label>
                                    <select
                                        name="categoriaId"
                                        value={filtro.categoriaId || ""}
                                        onChange={(e) => setFiltro({ ...filtro, categoriaId: e.target.value })}
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
                                <div className={style.grupoFormularioFiltrarTrancao}>
                                    <label>Data inicial</label>
                                    <input
                                        type="date"
                                        value={filtro.dataInicio || ""}
                                        onChange={(e) => setFiltro({ ...filtro, dataInicio: e.target.value })}
                                    />
                                </div>
                                <div className={style.grupoFormularioFiltrarTrancao}>
                                    <label>Data final</label>
                                    <input
                                        type="date"
                                        value={filtro.dataFim || ""}
                                        onChange={(e) => setFiltro({ ...filtro, dataFim: e.target.value })}
                                    />
                                </div>

                                <div className={style.rodapeModalFiltrarTrancao}>
                                    <button
                                        type="button"
                                        className={style.botaoCancelarFiltrarTrancao}
                                        onClick={fecharModalFiltrar}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className={style.botaoSalvarFiltrarTrancao}>
                                        Filtrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </TopbarPrincipal>
    );
}
