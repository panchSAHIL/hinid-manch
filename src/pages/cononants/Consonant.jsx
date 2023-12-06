import { useLocation } from 'react-router'
import s from './Consonant.module.scss'
import { useState, createContext, useContext } from 'react';

const LinkContext = createContext({
    link: {},
    setLink: () => {}
});

const ConsonantsfFileContext = createContext({
    consonantsFile: [],
    setConsonantsFile: () => {}
});

const iframeStyle = {
    width: "80%",
    height: "80%",
    border: 0
}

export default function Consonant(){
    const {state} = useLocation();
    const [link, setLink] = useState(undefined);
    const [consonantsFile, setConsonantsFile] = useState(state.file || []);

    return(
        <LinkContext.Provider value={{link, setLink}}>
        <ConsonantsfFileContext.Provider value={{consonantsFile, setConsonantsFile}}> 
            <div id={s.container}>
                <div id={s.title}>
                    {state.title}
                </div>
                <List state={state} />
                {
                    link !== undefined &&
                    <div id={s.display}>
                        <i
                            className="fa-regular fa-circle-xmark"
                            onClick={() => {
                                setLink(undefined)
                            }}
                        ></i>
                        <iframe title='video' src={link} style={iframeStyle}></iframe>
                    </div>
                }
            </div>
        </ConsonantsfFileContext.Provider>
        </LinkContext.Provider>
    )
}


function List(props){
    const {consonantsFile} = useContext(ConsonantsfFileContext);

    return(
        <ul id={s.list}>
            {
                consonantsFile[props.state.index].data.map((item, idx) => {
                    return <ListItem key={idx} text={item.display} link={item.link} side={idx % 2 === 0 ? "left" : "right"} unlocked={item.unlocked} state={props.state} index={idx} />
                })
            }
        </ul>
    )
}

function ListItem(props){
    const {setLink} = useContext(LinkContext);
    const {consonantsFile, setConsonantsFile} = useContext(ConsonantsfFileContext);

    function showVideo(){
        if(!props.unlocked) return;
        setLink(props.link);
        if(props.index < consonantsFile[props.state.index].data.length - 1){
            setConsonantsFile(prev => {
                prev[props.state.index].data[props.index + 1].unlocked = true;
                return prev;
            })
        }else{
            //unlock practice
        }
    }

    const padding = 40;
    const style = {
        paddingLeft: (props.side === "left" ? `0rem` : `${padding}rem`),
        paddingRight: (props.side !== "left" ? `0rem` : `${padding}rem`)
    }
    
    const pStyle = {
        backgroundColor: props.unlocked ? "green" : "red",
    }

    return(
        <li className={s.listItem} style={style}>
            <p onClick={showVideo} style={pStyle}>
                {props.text}
            </p>
        </li>
    )
}