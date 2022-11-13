import '../../css/GameCss/CardCss.css';
import {useState} from "react";

export default function Card(props) {
    const isEnemy = props.Enemy;
    const isStacked = props.Stacked;
    const id=props.cardId,[selected,setSelected] = !isEnemy && !isStacked ? useState(props.selectedCards.includes(id)):'';
    const color = isEnemy ? 'black' : props.color,
    handleClick = props.handleClick;
    function addToSelected() {
        if(!selected){
            handleClick(prevSelected => {
                return [...prevSelected,id];
            })
        }
        else {
            handleClick(prevSelected => {
                return prevSelected.filter((prevItem) => prevItem !== id);
            })
        }
        setSelected(!selected);
    }
    const select = ()=>{
        !isEnemy ? addToSelected() : '';
    }, isPagination = props.isPagination,
    card = isPagination ? <div className={'cardContainer'} style={{backgroundColor:"white"}} onClick={handleClick}>
        {props.card}
    </div> : <div id={id ? id: 'moreCards'} className={'cardContainer'}
          style={(selected && !isStacked) ? {backgroundColor:'lightgreen',color:color} : {backgroundColor:"white" ,color:color}}
          onClick={select}>
        {props.card}
    </div>;
    return (
        <>
            {card}
        </>
    )
}
