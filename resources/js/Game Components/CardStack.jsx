import Card from "./Card";
import {AsCardBar} from "./AsCardBar";
import uuid from "react-uuid";
import {useContext} from "react";
import {NextPlayerContext} from "../Contexts/NextPlayerContext";
import {RoomContext} from "../Contexts/RoomContext";
import {CardsPlayedContext} from "../Contexts/CardsPlayedContext";
import {next} from "lodash/seq";

export default function CardStack(props) {
    const Cards = new Map([[1, "🂠"]]),
        selectedCards = props.selected;
    const cardStack = props.cardStack.map((card) => {
        return <Card card={Cards.get(1)}></Card>
    }), {nextPlayer,setNextPlayer} = useContext(NextPlayerContext),
    Room = useContext(RoomContext),cardsPlayed = useContext(CardsPlayedContext);
    return (
        <div className={'row text-center justify-content-center h-50 align-items-center'}>
            <div className='col-4 align-self-center'>
                {selectedCards.length>0 ? <AsCardBar key={uuid()} handleAs={props.handleAs} selected={selectedCards}></AsCardBar>:''}
            </div>
            <div className='col-2 display-1 align-self-center'>
                {cardStack.length!==0 ? <Card card={Cards.get(1)} Stacked={true} ></Card>
                    : ''}
            </div>
            <div className='col-2 h4 align-self-center'>
                {cardStack.length!==0 ? 'Cards in the Stack : ' + cardStack.length : ''}
            </div>
            <div className='col-4 align-self-center'>
                {cardsPlayed.count &&
                    <div>
                        <div>
                            <h4 className={'me-1'}>
                                {cardsPlayed.count}
                            </h4>
                        </div>
                        {
                            cardsPlayed.count === 1 ?
                            <div className={'ms-3'}>
                                <h4>{cardsPlayed.number}</h4>
                                <h4 className={'me-1'}>
                                    was Played.
                                </h4>
                            </div>
                            :
                            <div className={'ms-3'}>
                                <h4>{cardsPlayed.number + "'s"}</h4>
                                <h4 className={'me-1'}>
                                    were Played.
                                </h4>
                            </div>
                        }
                    </div>}
            </div>
        </div>
    )
}
// <>

// </>
