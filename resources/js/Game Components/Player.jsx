import CardContainer from "./CardContainer";
import {useContext, useState} from "react";
import {CardsContext} from "../Contexts/CardsContext";
import {TurnContext} from "../Contexts/TurnContext";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {StackContext} from "../Contexts/StackContext";
import {UserContext} from "../Contexts/UserContext";
import {HeightContext} from "../Contexts/HeightContext";

export default function Player({Position,Enemy,onSubmit,handlePlay,handlePass,handleBluff,children}) {
    const position = Position === 'Top' ? 'align-items-start ' : 'align-items-end ';
    const isEnemy = Enemy;
    const size = Position === 'Top' ? 6 : 1;
    const { myCards , setMyCards } = useContext(CardsContext),
    { enemyCards , setEnemyCards } = useContext(CardsContext),
    { myTurn,setMyTurn } = useContext(TurnContext),
    cardStackLength  = !isEnemy && useContext(StackContext),
    User = useContext(UserContext),viewport_height = useContext(HeightContext);
    const { selectedCards,onSelectCard} = !isEnemy &&  useContext(SelectedCardsContext);
    const height = (viewport_height < 500) ? (isEnemy ? 'h-auto' : 'h-25') : 'h-25',
        margin = (viewport_height < 500 && !isEnemy) ? ' ' : '',
        buttonColSize = (viewport_height < 500 ) ? '2' : '1';
    // console.log('Player',viewport_height);
    return (
        <div className={'row text-center text justify-content-center '
        + position + height + margin} style={{marginBottom: (viewport_height>500 && viewport_height<800) ? -27 : 0}}>
            <strong style={{fontSize:20}}>{isEnemy ? 'Enemy ' : ''} Cards Remaining : {myCards ? myCards.length : enemyCards.length}</strong>
            {!isEnemy &&
                <div className={'col h-auto col-' + buttonColSize} >
                    { myTurn &&
                        <form onSubmit={onSubmit}>
                            {children}
                        </form>
                    }
                </div>}
            <CardContainer Enemy={isEnemy}>

            </CardContainer>
        </div>
    )
}
