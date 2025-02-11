import style from './TopbarLogo.module.css';
import LogoFinPlanner from '../../assets/Logo-FinPlanner.png';

export function TopbarLogo({ children }) {

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_logo}>
                    <img src={LogoFinPlanner} alt='Logo FinPlanner' />
                </div>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    );
}