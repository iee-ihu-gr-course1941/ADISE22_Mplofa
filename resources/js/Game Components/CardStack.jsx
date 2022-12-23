import Card from "./Card";
import {AsCardBar} from "./AsCardBar";
import uuid from "react-uuid";
import {useContext} from "react";
import {TurnContext} from "../Contexts/TurnContext";
import {NextPlayerContext} from "../Contexts/NextPlayerContext";

export default function CardStack(props) {
    const Cards = new Map([[1, "🂠"]]),
        selectedCards = props.selected;
    const cardStack = props.cardStack.map((card) => {
        return <Card card={Cards.get(1)}></Card>
    }), {nextPlayer,setNextPlayer} = useContext(NextPlayerContext);

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
                <h4 className={'my-3'} style={{color:"black "}}>Currently Playing</h4>
                <h3 className={'mb-4'}>{nextPlayer.name}</h3>
            </div>
        </div>
    )
}
// <>

// </>
