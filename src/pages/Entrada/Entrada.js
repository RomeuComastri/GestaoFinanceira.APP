import { Topbar } from '../../components/Topbar/Topbar';
import style from './Entrada.module.css';
import Imagem from '../../assets/financas.png';

export function Entrada() {
    return (
        <Topbar>
            <div className={style.entrada_container}>
                <div className={style.entrada_content}>
                    <h2>Bem-vindo ao FinPlanner!</h2>
                    <p>O FinPlanner é uma solução prática para ajudar você a organizar suas finanças, controlar gastos, definir metas e acompanhar resultados. Com ferramentas intuitivas e relatórios claros, nosso objetivo é facilitar seu planejamento financeiro e apoiar a realização dos seus objetivos.</p>
                    <p>Simplifique sua vida financeira com o FinPlanner!</p>
                </div>
                <div className={style.entrada_imagem}>
                    <img src={Imagem} alt="Imagem de finanças" />
                </div>
            </div>
        </Topbar>
    );
}