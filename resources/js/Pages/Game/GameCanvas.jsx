import Player from "../../Game Components/Player";
import CardStack from "../../Game Components/CardStack";
import {useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {Button} from "react-bootstrap";
import {Inertia} from "@inertiajs/inertia";
import {AsCardBar} from "../../Game Components/AsCardBar";
import {ScoreBoard} from "../../Game Components/ScoreBoard";

export default function GameCanvas(props) {
    const Players = props.Players;
    const User = props.auth.user,
        Game = props.Game,
        Cards = props.Game.player_cards,
        NextPlayer = props.Game.next_player,
    [cardStack,setCardStack] = useState(['Card1','Card2']),
    [myCards,setMyCards] = useState(Cards.player1.cards),
    [enemyCards,setEnemyCards] = useState(Array(Cards.player2.count).fill('Empty')),
    [cardsInStack,setCardsInStack] = useState(Array(props.Game.cards_down).fill('Empty')),
    [selectedCards,setSelectedCards] = useState([]),
    [moveStatus,setMoveStatus] = useState(0),
    [asEmpty,setAsEmpty] = useState(true);
    //
    // const onHandleChange = (event) => {
    //     setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    //     console.log(event.target.value);
    // };

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: User.id,
        game_id: Game.game_id,
        status : '',
        cards_played : {'cards_played':'','as':{'count':'','number':''}},
    });
    function handleBluff() {
        data.status=2;
        setSelectedCards([]);
        data.cards_played = [];
    }
    function handlePass() {
        data.status=3;
        setSelectedCards([]);
        data.cards_played = [];
    }
    function handlePlay() {
        data.status=1;
        if(data.cards_played.as.number !== '')
            post(route('Make_Move'),{
                preserveScroll:true,
                onSuccess:
                    (res)=>{
                        // console.log(res);
                    }
            },data);
    }

    function handleAs(e) {
            data.cards_played.cards_played = selectedCards;
            data.cards_played.as.count = selectedCards.length;
            data.cards_played.as.number = e.target.value;
        console.log(data.cards_played);
    }
    function submit(e) {
        e.preventDefault();
    }
    console.log(props.Game);
    return (
        <>
            <div className='container-fluid vh-100 vw-100 position-relative p-0'>
                <div className='row h-100 p-0 mx-0'>
                    <div className='col-10 px-0'>
                        <div className='card h-100'>
                            <div className='card-body h-100 text-center' style={{background:"#295f48"}}>
                                <Player Position='Top' cards={enemyCards} Enemy={true} onSelectCard={setSelectedCards}></Player>
                                <CardStack cardStack={cardsInStack} selected={selectedCards} handleAs={handleAs}></CardStack>
                                <Player Position='Bottom' cards={myCards} Enemy={false} onSelectCard={setSelectedCards}
                                        selectedCards={selectedCards} handleBluff={handleBluff} handlePass={handlePass}
                                        handlePlay={handlePlay} onSubmit={submit}
                                ></Player>
                            </div>
                        </div>
                    </div>
                    <div className='col-2 p-5'>
                        <ScoreBoard Players={Players} NextPlayer={NextPlayer}>

                        </ScoreBoard>
                    </div>
                </div>
            </div>
        </>
    )
}
