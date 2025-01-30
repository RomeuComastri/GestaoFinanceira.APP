import style from './BotaTopbar.module.css';
import { Link } from 'react-router-dom';

export function BotaoTopbar({link, nome}) {
    
    return (
            <Link to={link} className={style.botao_topbar}>{nome}</Link>
    );
}