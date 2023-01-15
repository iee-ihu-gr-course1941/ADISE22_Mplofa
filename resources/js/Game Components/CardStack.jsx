import Card from "./Card";
import {AsCardBar} from "./AsCardBar";
import uuid from "react-uuid";
import {useContext, useState} from "react";
import {NextPlayerContext} from "../Contexts/NextPlayerContext";
import {RoomContext} from "../Contexts/RoomContext";
import {CardsPlayedContext} from "../Contexts/CardsPlayedContext";
import {UserContext} from "../Contexts/UserContext";
import {HeightContext} from "../Contexts/HeightContext";

export default function CardStack(props) {
    const Cards = new Map([[1, "🂠"]]),
        selectedCards = props.selected;
    const cardStack = props.cardStack.map((card) => {
        return <Card card={Cards.get(1)}></Card>
    }), nextPlayer = useContext(NextPlayerContext),
    Room = useContext(RoomContext),cardsPlayed = useContext(CardsPlayedContext),
    User = useContext(UserContext),viewport_height = useContext(HeightContext);
    console.log('Stack',viewport_height)
    const height = (viewport_height < 500) ? ' h-25' : ' h-50',
    margin = (viewport_height < 500) ? ' my-4' : '';
    return (
        <div className={'row text-center justify-content-center align-items-center' + height + margin}>
            <div className='col-4 align-self-center'>
                {selectedCards.length>0 ? <AsCardBar key={uuid()} handleAs={props.handleAs} selected={selectedCards}></AsCardBar>:''}
            </div>
            <div className='col-2 display-1 align-self-center'>
                {(cardStack.length!==0 ) ? <Card card={Cards.get(1)} Stacked={true} ></Card>
                    : ''}
            </div>
            <div className='col-2 h4 align-self-center'>
                {cardStack.length!==0 ? 'Cards in the Stack : ' + cardStack.length : ''}
            </div>
            <div className='col-4 align-self-center'>
                {
                    //  The other player has played some cards
                    cardsPlayed && cardsPlayed.count ?
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
                                    {'was Played by' + (User.id !== nextPlayer.id ? ' You.' : nextPlayer.name)}
                                </h4>
                            </div>
                            :
                            <div className={'ms-3'}>
                                <h4>{cardsPlayed.number + "'s"}</h4>
                                <h4 className={'me-1'}>
                                    {'were played by ' + (User.id !== nextPlayer.id ? ' You.' : nextPlayer.name)}
                                </h4>
                            </div>
                        }
                    </div>
                    :
                    //    The other player has either passed or called a bluff.
                    <div>
                        <div>
                            {/*<h4 className={'me-1'}>*/}
                            {/*    {cardsPlayed.count}*/}
                            {/*</h4>*/}
                        </div>
                        {
                            cardsPlayed === 'Passed' ?
                                <div className={'ms-3'}>
                                    <h4>{(User.id !== nextPlayer.id ? 'You' : nextPlayer.name) + ' passed'}</h4>
                                </div>
                                : cardsPlayed === 'Bluff_Called' &&
                                <div className={'ms-3'}>
                                    <h4>{(User.id !== nextPlayer.id ? 'You' : nextPlayer.name) + ' called a Bluff'}</h4>
                                </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
// <>

// </>
