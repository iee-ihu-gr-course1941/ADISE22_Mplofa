import CardContainer from "./CardContainer";
import {useContext} from "react";
import {CardsContext} from "../Contexts/CardsContext";
import {TurnContext} from "../Contexts/TurnContext";
import {SelectedCardsContext} from "../Contexts/SelectedCardsContext";
import {StackContext} from "../Contexts/StackContext";
import {UserContext} from "../Contexts/UserContext";

export default function Player({Position,Enemy,onSubmit,handlePlay,handlePass,handleBluff,children}) {
    const position = Position === 'Top' ? 'align-items-start h-25' : 'align-items-end h-25';
    const isEnemy = Enemy;
    const size = Position === 'Top' ? 6 : 1;
    const { myCards , setMyCards } = useContext(CardsContext),
    { enemyCards , setEnemyCards } = useContext(CardsContext),
    { myTurn,setMyTurn } = useContext(TurnContext),
    cardStackLength  = !isEnemy && useContext(StackContext),
    User = useContext(UserContext);
    const { selectedCards,onSelectCard} = !isEnemy &&  useContext(SelectedCardsContext);
    return (
        <div className={'row text-center text align-items-center justify-content-center ' + position}>
            <strong style={{fontSize:20}}>Cards Remaining : {myCards ? myCards.length : enemyCards.length}</strong>
            {!isEnemy &&
                <div className={'col col-1'}>
                    { myTurn && <form onSubmit={onSubmit}>
                        {children}
                    </form>}
                </div>}
            <CardContainer Enemy={isEnemy}>

            </CardContainer>
        </div>
    )
}
