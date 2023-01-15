import '../../css/GameCss/CardCss.css';
import { useContext, useState } from "react";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {HeightContext} from "../Contexts/HeightContext";

export default function Card({cardObject,Enemy,Stacked,color,isPagination,card,handleClick}) {
    const cardObj = cardObject,
    isEnemy = Enemy,
    isStacked = Stacked,
    { selectedCards,setSelectedCards } = !isEnemy && useContext(SelectedCardsContext),
    [selected,setSelected] = (!isEnemy && !isStacked) ? useState(selectedCards.includes(cardObj)) : '',
    cardColor = isEnemy ? 'black' : color,
    handleClickCard = setSelectedCards,height = useContext(HeightContext),
    FontSize = (height < 500) ? 70 : 160,
    Width = (height < 500) ? 65 : 120,
    Height = (height < 500) ? 85 : 'auto';

    function addToSelected() {
        if(!selected) {
            handleClickCard(prevSelected => {
                return [...prevSelected,cardObj];
            });
        }
        else {
            handleClickCard(prevSelected => {
                return prevSelected.filter((prevItem) => prevItem !== cardObj);
            });
        }
        setSelected(!selected);
        console.log(selectedCards);
    }
    const select = ()=>{
        !isEnemy && !isStacked && addToSelected();
    },
    isPaginationBool = isPagination,
    Card = isPaginationBool ?
        <div className={'cardContainer'} style={{backgroundColor:"white",fontSize:FontSize,width:Width,height:Height}}
             onClick={handleClick}>
            {card}
        </div>
        :
        <div className={'cardContainer'}
          style={selected ? {backgroundColor:'lightblue',color:cardColor,fontSize:FontSize,width:Width,height:Height}
              : {backgroundColor:"white" ,color:cardColor,fontSize:FontSize,width:Width,height:Height}}
          onClick={select}>
            {card}
        </div>;
    return (
        <>
            {Card}
        </>
    )
}
