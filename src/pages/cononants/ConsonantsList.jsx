import s from './Consonant.module.scss'
// import consonantListData from '../../data/consonants.json'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

export default function ConsonantsList(){
    const [consonantsFile, setConsonantsFile] = useState([])

    useEffect(() => {
        async function getFile(){
            const response = await fetch("http://localhost:5500/getfile?file=consonants");

            if(response.ok){
                const res = await response.json();
                setConsonantsFile(res.file)
            }else{
                console.log("Error getting consonants file");
            }
        }

        getFile();
    }, [])

    return(
        <div id={s.container}>
            <div id={s.title}>
                Consonants List
            </div>
            <List consonantsFile={consonantsFile} />
        </div>
    )
}

function List(props){
    return(
        <ul id={s.list}>
            {
                props.consonantsFile.map((item, idx) => {
                    return <ListItem consonantsFile={props.consonantsFile} key={idx} index={idx} text={item.text} side={idx % 2 === 0 ? "left" : "right"} unlocked={item.unlocked}/>
                })
            }
        </ul>
    )
}

function ListItem(props){
    const navigate = useNavigate();

    const padding = 40;
    const style = {
        paddingLeft: (props.side === "left" ? `0rem` : `${padding}rem`),
        paddingRight: (props.side !== "left" ? `0rem` : `${padding}rem`)
    }
    
    const pStyle = {
        backgroundColor: props.unlocked ? "green" : "red",
        fontSize: "1rem"
    }

    return(
        <li className={s.listItem} style={style}>
            <p
            onClick={() => {
                // props.unlocked &&
                navigate("/consonant", {
                    state: {
                        title: props.text,
                        index: props.index,
                        file: props.consonantsFile
                    }
                })
            }}
            style={pStyle}
            >
                {props.text}
            </p>
        </li>
    )
}