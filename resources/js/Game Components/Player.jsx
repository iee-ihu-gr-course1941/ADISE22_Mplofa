import CardContainer from "./CardContainer";
import {useContext, useState} from "react";
import {CardsContext} from "../Contexts/CardsContext";
import {TurnContext} from "../Contexts/TurnContext";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {StackContext} from "../Contexts/StackContext";
import {UserContext} from "../Contexts/UserContext";
import {HeightContext} from "../Contexts/HeightContext";

export default function Player({Position,Enemy,onSubmit,children}) {
    const position = Position === 'Top' ? 'align-items-start ' : ' align-items-end',
    isEnemy = Enemy,
    size = Position === 'Top' ? 6 : 1,
    {myCards} = useContext(CardsContext),
    { enemyCards , setEnemyCards } = useContext(CardsContext),
    { myTurn,setMyTurn } = useContext(TurnContext),
    cardStackLength  = !isEnemy && useContext(StackContext),
    User = useContext(UserContext),
    { selectedCards,onSelectCard} = !isEnemy &&  useContext(SelectedCardsContext),
    viewport_height = useContext(HeightContext),
    height = (viewport_height < 500) ? (isEnemy ? ' h-auto' : ' h-25') : ' h-25',
    margin = (viewport_height < 500 && !isEnemy) ? ' ' : '',
    buttonColSize = (viewport_height < 500 ) ? '2' : '1';
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
