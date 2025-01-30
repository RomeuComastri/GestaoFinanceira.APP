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
        <div className={style.login_total}>
            <TopbarLogo>
            <Alerta
                    tipo={tipoAlerta}
                    mensagem={mensagemAlerta}
                    visivel={mostrarAlerta}
                    aoFechar={() => setMostrarAlerta(false)}
                />
                <div className={style.login_fundo}>
                    <div className={style.login_container}>
                        <h2>Login</h2>
                        <form onSubmit={(e) => { e.preventDefault(); Login() }}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado de email
                                required
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)} // Atualiza o estado de senha
                                required
                            />
                            <div className={style.login_senha}>
                                <p>
                                    Esqueceu sua senha?{" "}
                                    <Link className={style.login_link} to="/recuperarsenha">Clique aqui</Link>
                                </p>
                            </div>
                            <button type='submit' className={style.botao_login}>Entrar</button>
                            <div className={style.login_senha}>
                                <p>
                                    Não possui conta?{" "}
                                    <Link className={style.login_link} to="/cadastro">Cadastre-se</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </TopbarLogo>
        </div>
    );
}
