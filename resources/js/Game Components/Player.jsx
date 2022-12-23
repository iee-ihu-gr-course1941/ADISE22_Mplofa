import CardContainer from "./CardContainer";
import {Button} from "react-bootstrap";
import button from "bootstrap/js/src/button";
import {useContext} from "react";
import {CardsContext} from "../Contexts/CardsContext";
import {TurnContext} from "../Contexts/TurnContext";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {StackContext} from "../Contexts/StackContext";

export default function Player({Position,Enemy,onSubmit,handlePlay,handlePass,handleBluff}) {
    const position = Position === 'Top' ? 'align-items-start h-25' : 'align-items-end h-25';
    const isEnemy = Enemy;
    const size = Position === 'Top' ? 6 : 1;
    const { myCards , setMyCards } = useContext(CardsContext),
    { enemyCards , setEnemyCards } = useContext(CardsContext),
    { myTurn,setMyTurn } = useContext(TurnContext),
    { cardStackLength } = !isEnemy && useContext(StackContext);
    console.log(cardStackLength);
    const { selectedCards,onSelectCard} = !isEnemy &&  useContext(SelectedCardsContext);
    return (
        <div className={'row text-center text align-items-center justify-content-center ' + position}>
            <strong style={{fontSize:20}}>Cards Remaining : {myCards ? myCards.length : enemyCards.length}</strong>
            {!isEnemy &&
                <div className={'col col-1'}>
                    { myTurn && <form onSubmit={onSubmit}>
                        { selectedCards.length!==0 ?
                            <>
                                <Button className={'btn btn-info w-auto mx-3 my-1'} onClick={handlePlay}>{selectedCards.length  > 1 ? 'Play cards' : 'Play Card'}</Button>
                                <></>
                            </>
                            : <>
                                <button className={'btn btn-danger w-100'}  onClick={handlePass}>Pass</button>
                                <button className='btn btn-warning w-auto mt-2' onClick={handleBluff} disabled={cardStackLength === 0}>Call Bluff</button>
                            </>}
                    </form>}
                </div>}
            <CardContainer size={size} Enemy={isEnemy}>

            </CardContainer>
        </div>
    )
}
