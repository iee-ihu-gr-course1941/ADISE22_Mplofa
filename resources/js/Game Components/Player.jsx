import CardContainer from "./CardContainer";
import {Button} from "react-bootstrap";
import button from "bootstrap/js/src/button";

export default function Player(props) {
    const position = props.Position === 'Top' ? 'align-items-start h-25' : 'align-items-end h-25';
    const size = props.Position === 'Top' ? 6 : 1;
    const Cards = props.cards;
    const isEnemy = props.Enemy;
    return (
        <div className={'row text-center text align-items-center justify-content-center ' + position}>
            <strong style={{fontSize:20}}>Cards Remaining : {Cards.length}
            </strong>
            {!isEnemy ?
                <div className={'col col-1'}>
                    <form onSubmit={props.onSubmit}>
                        { props.selectedCards.length!==0 ?
                            <>
                                <Button className={'btn btn-info w-auto mx-3 my-1'} onClick={props.handlePlay}>{props.selectedCards.length  > 1 ? 'Play Cards' : 'Play Card'}</Button>
                                <></>
                            </>
                            : <>
                                <button className={'btn btn-danger w-100'}  onClick={props.handlePass} disabled={props.selectedCards.length!==0}>Pass</button>
                                <button className='btn btn-warning w-auto mt-2' onClick={props.handleBluff} disabled={props.selectedCards.length!==0}>Call Bluff</button>
                            </>}
                    </form>
                </div>
            :''}
            <CardContainer size={size} Enemy={isEnemy} cards={Cards} onSelectCard={props.onSelectCard} selectedCards={props.selectedCards}>

            </CardContainer>
        </div>
    )
}
