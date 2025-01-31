
import { TopbarPrincipal } from '../../components/TopbarPrincipal/TopbarPrincipal';
import style from './EditarUsuario.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UsuarioApi from '../../services/UsuarioApi';
import Alerta from '../../components/Alerta/Alerta';

export function EditarUsuario() {

    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const [senha, setSenha] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState('');

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');

    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 10000);
    };

    const handleSubmitSenha = async (e) => {
        e.preventDefault();
        if (isFormValidSenha()) {
            try {
                await UsuarioApi.alterarSenhaAsync(id, senha, senhaAntiga);
                setMensagemAlerta(`Senha alterada com sucesso!`);
                setTipoAlerta('success');
                exibirAlerta(true);
            } catch (error) {
                setMensagemAlerta(`Erro ao alterar senha: ${error.response.data}`);
                setTipoAlerta('danger');
                exibirAlerta(true);
            }
        } else {
            alert('Por favor,  preencha todos  os campos.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                console.log("AQuiiiiiiiiiiiiiiiiiiiiiii aapi")
                await UsuarioApi.atualizarAsync(id, nome, email);
                setMensagemAlerta(`Edição realizada com sucesso!`);
                setTipoAlerta('success');
                exibirAlerta(true);
            } catch (error) {
                setMensagemAlerta(`Erro ao realizar edição: ${error.response.data}`);
                setTipoAlerta('danger');
                exibirAlerta(true);
            }

        } else {
            alert('Por favor,  preencha todos  os campos.');
        }
    };

    useEffect(() => {

        const buscarDadosUsuario = async () => {
            try {
                const usuario = await UsuarioApi.obterAsync(id);
                setNome(usuario.nome);
                setEmail(usuario.email);
            } catch (error) {
                setMensagemAlerta(`Erro ao buscar dados do usuário`);
                setTipoAlerta('danger');
                exibirAlerta(true);
            }
        }

        buscarDadosUsuario();

    }, [id]);

    const isFormValid = () => {
        return nome && email;
    };

    const isFormValidSenha = () => {
        return senha && senhaAntiga;
    };

    return (
        <TopbarPrincipal>
            <Alerta
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
            <div className={style.totalEditar}>
                <div className={style.modal_containerEditarUsuario}>
                    <div className={style.cabecalhoModalEditarUsuario}>
                        <h2>Editar Usuário</h2>
                    </div>
                    <form onSubmit={handleSubmit} className={style.formularioEditarUsuario}>
                        <div className={style.grupoFormularioEditarUsuario}>
                            <input
                                type="text"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome"
                                required
                            />
                        </div>
                        <div className={style.grupoFormularioEditarUsuario}>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite o email"
                                required
                            />
                        </div>
                        <div className={style.rodapeModalEditarUsuario}>
                            <button type="submit" className={style.botaoSalvarEditarUsuario}>
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
                <div className={style.modal_containerEditarUsuario}>
                    <div className={style.cabecalhoModalEditarUsuario}>
                        <h2>Alterar Senha</h2>
                    </div>
                    <form onSubmit={handleSubmitSenha} className={style.formularioEditarUsuario}>
                        <div className={style.grupoFormularioEditarUsuario}>
                            <input
                                type="password"
                                name="senha"
                                value={senhaAntiga}
                                onChange={(e) => setSenhaAntiga(e.target.value)}
                                placeholder="Digite a senha atual"
                                required
                            />
                        </div>
                        <div className={style.grupoFormularioEditarUsuario}>
                            <input
                                type="password"
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Digite a nova senha"
                                required
                            />
                        </div>
                        <div className={style.rodapeModalEditarUsuario}>
                            <button type="submit" className={style.botaoSalvarEditarUsuario}>
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </TopbarPrincipal>
    )
}