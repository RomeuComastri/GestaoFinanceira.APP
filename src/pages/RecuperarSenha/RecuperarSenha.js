import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopbarLogo } from '../../components/TopbarLogo/TopbarLogo';
import RecuperarSenhaApi from "../../services/RecuperarSenhaApi";
import Alerta from '../../components/Alerta/Alerta';

import style from "./RecuperarSenha.module.css";

export function RecuperarSenha() {
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [senha, setSenha] = useState('');
    const [colocarCodigo, setColocarCodigo] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');

    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 10000);
    };

    const EnviarEmail = async () => {
        try {
            await RecuperarSenhaApi.enviarEmailAsync(email);
            setColocarCodigo(true);
            setMensagemAlerta(`Email enviado com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
        } catch (error) {
            setMensagemAlerta(`Erro ao enviar email: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    const EnviarCodigo = async () => {
        try {
            await RecuperarSenhaApi.enviarCodigoAsync(email, codigo);
            setIsModalOpen(true);
            setMensagemAlerta(`Código validado com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
        } catch (error) {
            setMensagemAlerta(`Erro ao validar codigo: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    const AlterarSenha = async (e) => {
        e.preventDefault();
        try {
            await RecuperarSenhaApi.AlterarSenhaAsync(email, senha);
            setMensagemAlerta(`Senha alterada sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {
            console.error("Erro ao alterar senha:", error);
            setMensagemAlerta(`Erro ao alterar senha: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    };

    const fecharModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setEmail('');
        setCodigo('');
        setSenha('');
    }, []);

    return (
        <TopbarLogo>
            <Alerta
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
            <div className={style.totalRecuperarSenha}>
                <div className={style.modal_containerRecuperarSenha}>
                    <div className={style.cabecalhoModalRecuperarSenha}>
                        <h2>Recuperar senha</h2>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!colocarCodigo) {
                            EnviarEmail();
                        } else {
                            EnviarCodigo();
                        }
                    }} className={style.formularioRecuperarSenha}>
                        <div className={style.grupoFormularioRecuperarSenha}>
                            {colocarCodigo ? (
                                <input
                                    type="text"
                                    placeholder="Código"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                />
                            ) : (

                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            )}
                        </div>
                        <div className={style.rodapeModalRecuperarSenha}>
                            <button type="submit" className={style.botaoSalvarRecuperarSenha}>Enviar</button>
                        </div>
                    </form>
                </div>

                {isModalOpen && (
                    <div className={style.overlayModalSenha}>
                        <div className={style.modal_containerSenha}>
                            <div className={style.cabecalhoModalSenha}>
                                <h2>Alterar Senha</h2>
                                <button className={style.botaoFecharSenha} onClick={fecharModal}>
                                    &times;
                                </button>
                            </div>
                            <form onSubmit={AlterarSenha} className={style.formularioRecuperarSenha}>
                                <div className={style.grupoFormularioSenha}>

                                    <input
                                        type="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="Digite a nova senha"
                                        required
                                    />
                                </div>
                                <div className={style.rodapeModalSenha}>
                                    <button
                                        type="button"
                                        className={style.botaoCancelarSenha}
                                        onClick={fecharModal}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className={style.botaoSalvarSenha}>
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </TopbarLogo>
    );
}
