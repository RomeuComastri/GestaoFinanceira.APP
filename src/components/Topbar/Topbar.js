import style from './Topbar.module.css';
import LogoFinPlanner from '../../assets/Logo-FinPlanner.png';
import { BotaoTopbar } from '../../components/BotaoTopbar/BotaoTopbar';

export function Topbar({ children }) {

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_logo}>
                    <img src={LogoFinPlanner} alt='Logo FinPlanner' />
                </div>
                <div className={style.topbar_botoes}>
                    <BotaoTopbar link={'/login'} nome={'Login'} />
                    <BotaoTopbar link={'/cadastro'} nome={'Cadastro'} />
                </div>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    );
}