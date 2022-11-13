import Card from "./Card";
import {AsCardBar} from "./AsCardBar";
import uuid from "react-uuid";

export default function CardStack(props) {
    const Cards = new Map([[1, "🂠"]]),
        selectedCards = props.selected;
    const cardStack = props.cardStack.map((card) => {
        return <Card card={Cards.get(1)}></Card>
    });
    return (
        <div className={'row text-center justify-content-center h-50 align-items-center'}>
            {selectedCards.length>0 ? <AsCardBar key={uuid()} handleAs={props.handleAs} selected={selectedCards}></AsCardBar>:''}
            <div className='col-2 display-1'>
                {cardStack.length!==0 ? <Card card={Cards.get(1)} Stacked={true} ></Card>
                    : ''}
            </div>
            <div className='col-2 h4'>
                {cardStack.length!==0 ? 'Cards in the Stack : ' + cardStack.length : ''}
            </div>
        </div>
    )
}
