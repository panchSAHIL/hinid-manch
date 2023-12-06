import s from './Vowels.module.scss'
// import vowelsData from '../../data/vowels.json'
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';

const LinkContext = createContext({
    link: {},
    setLink: () => {}
});

const VowelsArrayContext = createContext({
    vowelsArray: {},
    setVowelsArray: () => {}
});

const iframeStyle = {
    width: "80%",
    height: "80%",
    border: 0
}

export default function Vowels() {
    const [link, setLink] = useState(undefined);
    const [vowelsArray, setVowelsArray] = useState({})

    useEffect(() => {
        async function getFile(){
            const response = await fetch("http://localhost:5500/getfile?file=vowels");

            if(response.ok){
                const res = await response.json();
                setVowelsArray(res.file)
            }else{
                console.log("Error getting vowels file");
            }
        }

        getFile();
    }, [])

    return (
        <LinkContext.Provider value={{link, setLink}}>
        <VowelsArrayContext.Provider value={{vowelsArray, setVowelsArray}}>
            <div id={s.vowels}>
                <div id={s.title}>
                    Vowels
                </div>
                <List />
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
        </VowelsArrayContext.Provider>
        </LinkContext.Provider>
    );
}


function List(){
    const {vowelsArray} = useContext(VowelsArrayContext);

    return(
        <ul id={s.list}>
            {
                vowelsArray.data?.map((item, idx) => {
                    return <ListItem key={idx} index={idx} text={item.text} link={item.link} side={idx % 2 === 0 ? "left" : "right"} unlocked={item.unlocked} />
                })
            }
        </ul>
    )
}

function ListItem(props){
    const {setLink} = useContext(LinkContext);
    const {vowelsArray, setVowelsArray} = useContext(VowelsArrayContext);

    function showVideo(){
        if(!props.unlocked) return;
        setLink(props.link);
        if(props.index < vowelsArray.data.length - 1){
            setVowelsArray(prev => {
                prev.data[props.index + 1].unlocked = true;
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
        backgroundColor: props.unlocked ? "green" : "red"
    }

    return(
        <li className={s.listItem} style={style}>
            <p onClick={showVideo} style={pStyle}>
                {props.text}
            </p>
        </li>
    )
}