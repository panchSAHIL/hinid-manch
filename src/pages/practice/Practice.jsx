import s from './Practice.module.scss'
// import vowelsData from '../../data/vowels.json'
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const PracticeArrayContext = createContext({
    practiceArray: {},
    setPracticeArray: () => {}
});

export default function Practice() {
    const [practiceArray, setPracticeArray] = useState([])

    useEffect(() => {
        async function getFile(){
            const response = await fetch("http://localhost:5500/getfile?file=practice");

            if(response.ok){
                const res = await response.json();
                setPracticeArray(res.file)
            }else{
                console.log("Error getting vowels file");
            }
        }

        getFile();
    }, []);

    return (
        <PracticeArrayContext.Provider value={{practiceArray, setPracticeArray}}>
            <div id={s.practice}>
                <div id={s.title}>
                    Practice
                </div>
                <List />
            </div>
        </PracticeArrayContext.Provider>
    );
}


function List(){
    const {practiceArray} = useContext(PracticeArrayContext);

    return(
        <ul id={s.list}>
            {
                practiceArray?.map((item, idx) => {
                    return <ListItem key={idx} index={idx} text={item.text} image={item.image} side={idx % 2 === 0 ? "left" : "right"} />
                })
            }
        </ul>
    )
}

function ListItem(props){
    const navigate = useNavigate();
    function redirectToPage(){
        navigate("/submitaudio", {
            state: {
                text: props.text,
                image: props.image
            }
        })
    }

    const padding = 40;
    const style = {
        paddingLeft: (props.side === "left" ? `0rem` : `${padding}rem`),
        paddingRight: (props.side !== "left" ? `0rem` : `${padding}rem`)
    }

    return(
        <li className={s.listItem} style={style}>
            <p onClick={redirectToPage}>
                {props.text}
            </p>
        </li>
    )
}