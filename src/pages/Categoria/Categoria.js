import style from './Categoria.module.css';
import { TopbarPrincipal } from '../../components/TopbarPrincipal/TopbarPrincipal';
import CategoriaApi from '../../services/CategoriaApi';
import { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Searchbar } from '../../components/Searchbar/Searchbar';
import ModalAdicionarCategoria from '../../components/ModalAdicionarCategoria/ModalAdicionarCategoria';
import ModalDeletarCategoria from '../../components/ModalDeletarCategoria/ModalDeletarCategoria';
import ModalEditarCategoria from '../../components/ModalEditarCategoria/ModalEditarCategoria';
import Alerta from '../../components/Alerta/Alerta';

export function Categoria() {

    const [categorias, setCategorias] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeletarOpen, setIsModalDeletarOpen] = useState(false);
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

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

    const handleClickNovaCategoria = () => {
        setIsModalOpen(true);
    };

    const handleClickEditar = (categoria) => {
        setCategoriaSelecionada(categoria);
        setIsModalEditarOpen(true);
    };

    const handleClickDeletar = (categoria) => {
        setCategoriaSelecionada(categoria);
        setIsModalDeletarOpen(true);
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

    useEffect(() => {
        carregarCategorias();
    }, []);


    return (
        <TopbarPrincipal>
            <Alerta
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
            <div className={style.container_principal}>
                <div className={style.tituloCategoria}>
                    <div className={style.barraFiltro}>
                        <Searchbar placeholder="Pesquisar por nome" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <button onClick={handleClickNovaCategoria} className={style.botaoAdicionar}>
                        + Adicionar categoria
                    </button>
                </div>
                <div className={style.containerPrincipalTabelaCategoria}>
                    <div className={style.tabelaMensagemCategoria}>
                        <div className={style.mensagemTipos}>Receita</div>
                        <div className={style.container_tabelaCategoria}>
                            <table className={style.tabelaCategoria}>
                                <thead className={style.tabela_cabecalhoCategoria}>
                                    <tr className={style.tabela_item_cabecalhoCategoria}>
                                        <th>Nome</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody className={style.tabela_corpoCategoria}>
                                    {categorias
                                        .filter((categoria) => {

                                            return search.toLowerCase() === ''
                                                ? categoria
                                                : categoria.nome.toLowerCase().includes(search.toLowerCase());
                                        })
                                        .filter(categoria => categoria.tipo === 1).length > 0 ? (
                                        categorias
                                            .filter((categoria) => {

                                                return search.toLowerCase() === ''
                                                    ? categoria
                                                    : categoria.nome.toLowerCase().includes(search.toLowerCase());
                                            })
                                            .filter(categoria => categoria.tipo === 1)
                                            .map((categoria) => (
                                                <tr key={categoria.id}>
                                                    <td>{categoria.nome || 'Sem Categoria'}</td>
                                                    <td>
                                                        <button onClick={() => handleClickEditar(categoria)} className={style.editar}>
                                                            <MdEdit />
                                                        </button>
                                                        <button onClick={() => handleClickDeletar(categoria)} className={style.deletar}>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">Nenhuma categoria encontrada</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={style.tabelaMensagemCategoria}>
                        <div className={style.mensagemTipos}>Despesa</div>
                        <div className={style.container_tabelaCategoria}>
                            <table className={style.tabelaCategoria}>
                                <thead className={style.tabela_cabecalhoCategoria}>
                                    <tr className={style.tabela_item_cabecalhoCategoria}>
                                        <th>Nome</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody className={style.tabela_corpoCategoria}>
                                    {categorias
                                        .filter((categoria) => {
                                            return search.toLowerCase() === ''
                                                ? categoria
                                                : categoria.nome.toLowerCase().includes(search.toLowerCase());
                                        })
                                        .filter(categoria => categoria.tipo === 0).length > 0 ? (
                                        categorias
                                            .filter((categoria) => {

                                                return search.toLowerCase() === ''
                                                    ? categoria
                                                    : categoria.nome.toLowerCase().includes(search.toLowerCase());
                                            })
                                            .filter(categoria => categoria.tipo === 0)
                                            .map((categoria) => (
                                                <tr key={categoria.id}>
                                                    <td>{categoria.nome || 'Sem Categoria'}</td>
                                                    <td>
                                                        <button onClick={() => handleClickEditar(categoria)} className={style.editar}>
                                                            <MdEdit />
                                                        </button>
                                                        <button onClick={() => handleClickDeletar(categoria)} className={style.deletar}>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">Nenhuma categoria encontrada</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <ModalAdicionarCategoria
                        visivel={isModalOpen}
                        fecharModal={() => setIsModalOpen(false)}
                        usuarioId={usuarioId}
                        atualizarCategorias={carregarCategorias}
                    />
                )},

                {isModalDeletarOpen && (
                    <ModalDeletarCategoria
                        visivel={isModalDeletarOpen}
                        fecharModal={() => setIsModalDeletarOpen(false)}
                        categoriaId={categoriaSelecionada.id}
                        atualizarCategorias={carregarCategorias}
                    />
                )}

                {isModalEditarOpen && (
                    <ModalEditarCategoria
                        visivel={isModalEditarOpen}
                        fecharModal={() => setIsModalEditarOpen(false)}
                        atualizarCategorias={carregarCategorias}
                        categoriaId={categoriaSelecionada.id}
                    />
                )}
            </div>
        </TopbarPrincipal>
    );
}
