import style from './TopbarPrincipal.module.css';
import Logo from '../../assets/logo.png';
import { MdLogout } from 'react-icons/md';
import { FaCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import UsuarioApi from "../../services/UsuarioApi";
import { useState, useEffect } from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { useLocation } from 'react-router-dom';

export function TopbarPrincipal({ children }) {
    const [showModal, setShowModal] = useState(false); // Modal inicialmente invisível
    const [usuario, setUsuario] = useState(true);
    const [timeoutId, setTimeoutId] = useState(null); // Estado para armazenar o ID do timeout
    const [isMouseInside, setIsMouseInside] = useState(false); // Estado para controlar se o mouse está dentro

    const usuarioId = localStorage.getItem('usuarioId');

    const location = useLocation();
    const linkAtivoTransacao = location.pathname === '/transacao';
    const linkAtivoCategoria = location.pathname === '/categoria';

    function Sair() {
        localStorage.removeItem('usuarioId')
    }

    async function obterDadosUsuario() {
        try {
            const usuarioObtido = await UsuarioApi.obterAsync(usuarioId);
            setUsuario(usuarioObtido)
        } catch (error) {
            console.error("Erro ao carregar dados do usuario:", error);
        }
    };

    const handleMouseEnter = () => {
        setIsMouseInside(true); // O mouse entrou na área do ícone
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setShowModal(true); // Exibe o modal após o tempo mínimo
        }, 300); // Atraso de 300ms

        setTimeoutId(newTimeoutId);
    };

    const handleMouseLeave = () => {
        setIsMouseInside(false); // O mouse saiu da área do ícone
        if (!showModal) {
            setShowModal(false); // Esconde imediatamente se o modal não está visível
        }
    };

    // Garantir que o modal continue visível até o mouse sair da área do ícone
    useEffect(() => {
        if (!isMouseInside && showModal) {
            const timer = setTimeout(() => {
                setShowModal(false); // Esconde o modal após o tempo mínimo
            }, 300); // Tempo mínimo para manter o modal visível após sair do ícone

            return () => clearTimeout(timer);
        }
    }, [isMouseInside, showModal]);

    useEffect(() => {
        obterDadosUsuario();
    }, []);

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_logo}>
                    <img src={Logo} alt='Logo' />
                </div>
                <div className={style.rotas}>
                    <div className={style.acessar}>
                        <Link to='/transacao' className={`${style.botao_rotas} ${linkAtivoTransacao ? style.link_ativo_transacao : ""}`}>
                            <GrTransaction className={style.iconeRotas} />
                            <div className={style.nomeRotas}>Transações</div>
                        </Link>
                    </div>
                    <div className={style.acessar}>
                        <Link to='/categoria' className={`${style.botao_rotas} ${linkAtivoCategoria ? style.link_ativo_categoria : ""}`}>
                            <BiSolidCategory className={style.iconeRotas} />
                            <div className={style.nomeRotas}>Categorias</div>
                        </Link>
                    </div>
                </div>
                <div className={style.topbar_icones}>
                    <div
                        className={style.acessarModalUsuario}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link className={style.botao_usuario}>
                            <FaCircleUser />
                        </Link>
                        {showModal && (
                            <div className={style.modal_usuario}>
                                <h4>Perfil Usuário</h4>
                                <hr />
                                <p>{usuario.nome}</p>
                                <hr />
                                <p>{usuario.email}</p>
                                <hr />
                                <div className={style.editarLink}>
                                <Link to='/usuario/editar' state={usuario.id} className={style.botao_editar}>
                                    Editar Perfil
                                </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={style.acessarDeslogar}>
                        <Link to='/login' className={style.botao_deslogar} onClick={Sair}>
                            <MdLogout />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    );
}
