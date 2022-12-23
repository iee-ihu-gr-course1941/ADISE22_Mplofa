import Player from "../../Game Components/Player";
import CardStack from "../../Game Components/CardStack";
import {useEffect, useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {ScoreBoard} from "../../Game Components/ScoreBoard";
import {CardsContext} from "../../Contexts/CardsContext";
import {TurnContext} from "../../Contexts/TurnContext";
import {NextPlayerContext} from "../../Contexts/NextPlayerContext";
import {SelectedCardsContext} from "../../Contexts/SelectedCardsContext";
import {StackContext} from "../../Contexts/StackContext";

export default function GameCanvas(props) {
        const User = props.auth.user,
        Cards = props.Game.player_cards,
    [Players,setPlayers] = useState(props.Players),
    [Game,setGame] = useState(props.Game),
    [nextPlayer,setNextPlayer] = useState(Game.next_player === Players.Player1.id ?  Players.Player1 : Players.Player2 ),
    [myCards,setMyCards] = useState(Cards.player1.cards),
    [enemyCards,setEnemyCards] = useState(Array(Cards.player2.count).fill('Empty')),
    [cardsInStack,setCardsInStack] = useState(Array(Game.cards_down).fill('Empty')),
    [selectedCards,setSelectedCards] = useState([]),
    [moveStatus,setMoveStatus] = useState(0),
    [GameOver,setGameOver] = useState(Game.status === '2' || Game.status === '3'),
    [myTurn,setMyTurn]=useState(Game.next_player === User.id),
    [asSelected,setAsSelected] = useState(false);
    let selectedError = '';

    const { data, setData, post,get, processing, errors, reset } = useForm({
        user_id: User.id,
        game_id: Game.game_id,
        status : '',
        cards_played : {'cards_played':'','as':{'count':'','number':''}},
    });
    // useEffect(()=>{
    //     get(route('Check_Enemy_Move'),{
    //         preserveScroll:true,
    //         onSuccess:
    //             (res)=> {
    //                 console.log("Response",res)
    //             }
    //     },data);
    // },[]);

    function handlePlay() {
        data.status=1;
        if(asSelected)
            post(route('Make_Move'),{
                preserveScroll:true,
                onSuccess:
                    (res)=> {
                        setNewState(res.props.Game);
                    }
            },data);
    }

    function handleBluff() {
        data.status=2;
        setSelectedCards([]);
        data.cards_played = [];
            post(route('Make_Move'),{
                preserveScroll:true,
                onSuccess:
                    (res)=> {
                        setNewState(res.props.Game);
                    }
            },data);
    }

    function handlePass() {
        data.status=3;
        setSelectedCards([]);
        data.cards_played = [];
        post(route('Make_Move'),{
            preserveScroll:true,
            onSuccess:
                (res)=> {
                    setNewState(res.props.Game);
                }
        },data);
    }

    function setNewState(NewState) {
        setGame(NewState);
        setCardsInStack(Array(NewState.cards_down).fill('Empty'));
        setSelectedCards([]);
        setMyCards(NewState.player_cards.player1.cards);
        setEnemyCards(Array(NewState.player_cards.player2.count).fill('Empty'));
        setMyTurn(NewState.next_player === User.id);
        setNextPlayer(NewState.next_player === Players.Player1.id ?  Players.Player1 : Players.Player2);
        reset('cards_played','status');
    }
    function handleAs(e) {
            data.cards_played.cards_played = selectedCards;
            data.cards_played.as.count = selectedCards.length;
            data.cards_played.as.number = e.target.value;
            setAsSelected(true);
    }

    function submit(e) {
        e.preventDefault();
    }

    return (
        <div className='container-fluid vh-100 vw-100 position-relative p-2'>
            <div className='row h-100 p-0 mx-0'>
                <div className='col-11 px-0'>
                    <div className='card h-100'>
                        <div className='card-body h-100 text-center' style={{background:"#295f48"}}>
                            <SelectedCardsContext.Provider value={{selectedCards,setSelectedCards}}>
                                <TurnContext.Provider value={{myTurn,setMyTurn}}>
                                    <CardsContext.Provider value={{enemyCards,setEnemyCards}} >
                                        <Player Position='Top' Enemy={true}></Player>
                                    </CardsContext.Provider>
                                    <NextPlayerContext.Provider value={{nextPlayer,setNextPlayer}}>
                                        <CardStack cardStack={cardsInStack} selected={selectedCards} handleAs={handleAs}></CardStack>
                                    </NextPlayerContext.Provider>
                                    <CardsContext.Provider value={{myCards,setMyCards}}>

                                            <StackContext.Provider value={cardsInStack.length}>
                                                <Player Position='Bottom' Enemy={false}
                                                        handleBluff={handleBluff} handlePass={handlePass}
                                                        handlePlay={handlePlay} onSubmit={submit} reset={reset}
                                                ></Player>
                                            </StackContext.Provider>
                                    </CardsContext.Provider>
                                </TurnContext.Provider>
                            </SelectedCardsContext.Provider>
                        </div>
                    </div>
                </div>
                <div className='col-1 p-5' style={{background:"ghostwhite"}}>
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                        Toggle
                    </button>
                    <ScoreBoard Players={Players}>

                    </ScoreBoard>
                </div>
            </div>
        </div>
    )
}
