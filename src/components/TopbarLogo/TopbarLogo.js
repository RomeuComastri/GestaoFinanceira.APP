import style from './TopbarLogo.module.css';
import Logo from '../../assets/logo.png';

export function TopbarLogo({ children }) {

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_logo}>
                    <img src={Logo} alt='Logo' />
                </div>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    );
}