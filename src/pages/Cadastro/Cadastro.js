import style from './Cadastro.module.css';
import { Link } from 'react-router-dom';
import { TopbarLogo } from '../../components/TopbarLogo/TopbarLogo';
import { useEffect, useState } from "react";
import UsuarioApi from "../../services/UsuarioApi";
import Alerta from '../../components/Alerta/Alerta';
import { useNavigate } from "react-router-dom";

export function Cadastro() {
    const [nome, setNome] = useState('');
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

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (isFormValid()) {
            try {
                await UsuarioApi.criarAsync(nome, email, senha);
                setMensagemAlerta(`Usuário cadastrado com sucesso!`);
                setTipoAlerta('success');
                exibirAlerta(true);
                navigate('/login'); 
            } catch (error) {
                setMensagemAlerta(`Erro ao cadastrar usuário: ${error.response.data}`);
                setTipoAlerta('danger');
                exibirAlerta(true);
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    const isFormValid = () => {
        return nome && email && senha;
    };


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
                        <h2>Cadastro</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="nome"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <button type='submit' className={style.botao_cadastro}>Cadastrar</button>
                            <div className={style.login_senha}>
                                <p>
                                    Já possui conta?{" "}
                                    <Link className={style.login_link} to="/login">Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </TopbarLogo>
        </div>
    );
}