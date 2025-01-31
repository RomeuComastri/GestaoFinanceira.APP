import style from './Login.module.css';
import { Link } from 'react-router-dom';
import { TopbarLogo } from '../../components/TopbarLogo/TopbarLogo';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioApi from "../../services/UsuarioApi";
import Alerta from '../../components/Alerta/Alerta';

export function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
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

    async function Login(event) {

        try {
            const id = await UsuarioApi.verificarLogin(email, senha);
            localStorage.setItem('usuarioId', id);
            setMensagemAlerta(`Login efetuado com sucesso!`);
            setTipoAlerta('success');
            exibirAlerta(true);
            navigate('/transacao');

        } catch (error) {
            setMensagemAlerta(`Erro ao efetuar login: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta(true);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('usuarioId') != null) {
            navigate('/login');
        }
    }, [navigate]);

    return (
            <TopbarLogo>
                <Alerta
                    tipo={tipoAlerta}
                    mensagem={mensagemAlerta}
                    visivel={mostrarAlerta}
                    aoFechar={() => setMostrarAlerta(false)}
                />
                <div className={style.totalLogin}>
                    <div className={style.modal_containerLogin}>
                        <div className={style.cabecalhoModalLogin}>
                            <h2>Login</h2>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); Login() }} className={style.formularioLogin}>
                            <div className={style.grupoFormularioLogin}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado de email
                                    required
                                />
                            </div>
                            <div className={style.grupoFormularioLogin}>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)} // Atualiza o estado de senha
                                    required
                                />
                            </div>
                            <div className={style.login_EsqueceuSenha}>
                                <p>
                                    Esqueceu sua senha?{" "}
                                    <Link className={style.login_link} to="/recuperarsenha">Recuperar senha</Link>
                                </p>
                            </div> 
                            <div className={style.rodapeModalLoginUsuario}>
                                <button type='submit' className={style.botaoSalvarLogin}>Entrar</button>
                            </div>
                             <div className={style.login_senha}>
                                <p>
                                    Não possui conta?{" "}
                                    <Link className={style.login_link} to="/cadastro">Cadastrar</Link>
                                </p>
                            </div> 
                        </form>
                    </div>
                </div>
            </TopbarLogo>
    );
}
