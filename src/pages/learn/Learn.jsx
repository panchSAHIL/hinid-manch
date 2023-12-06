import { useNavigate } from "react-router-dom";
import s from './Learn.module.scss';

export default function Learn() {
    const navigate = useNavigate();

    return (
        <div id={s.learn}>
            <div id={s.title}>
                Learn
            </div>
            <div id={s.btns}>
                <div
                className={s.btn}
                onClick={() => {
                    navigate("/vowels");
                }}
                >
                    Vowels
                </div>
                <div
                className={s.btn}
                onClick={() => {
                    navigate("/consonantslist");
                }}
                >
                    Consonants
                </div>
            </div>
        </div>
    );
}
