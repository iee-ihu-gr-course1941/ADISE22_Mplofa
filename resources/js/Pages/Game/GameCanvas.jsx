import Player from "../../Game Components/Player";
import CardStack from "../../Game Components/CardStack";
import {useEffect, useState} from "react";
import {useForm} from "@inertiajs/inertia-react";
import {CardsContext} from "../../Contexts/CardsContext";
import {TurnContext} from "../../Contexts/TurnContext";
import {NextPlayerContext} from "../../Contexts/NextPlayerContext";
import {SelectedCardsContext} from "../../Contexts/SelectedCardsContext";
import {StackContext} from "../../Contexts/StackContext";
import {Button} from "react-bootstrap";
import {Inertia} from "@inertiajs/inertia";
import {CardsPlayedContext} from "../../Contexts/CardsPlayedContext";
import {UserContext} from "../../Contexts/UserContext";
import {HeightContext} from "../../Contexts/HeightContext";

export default function GameCanvas(props) {
    const User = props.auth.user,
        Room = props.Room,
    [Players,setPlayers] = useState(props.Players),
    [Game,setGame] = useState(props.Game ? props.Game : null),
    [Cards,setCards] = useState(props.Game ? props.Game.player_cards : []),
    [nextPlayer,setNextPlayer] = useState(props.Game.next_player),
    [myCards,setMyCards] = useState(props.Game.player_cards.player1.cards),
    [enemyCards,setEnemyCards] = useState(Array(props.Game.player_cards.player2.count).fill('Empty')),
    [cardsInStack,setCardsInStack] = useState(props.Game ? Array(props.Game.cards_down).fill('Empty') : []),
    [selectedCards,setSelectedCards] = useState([]),
    [moveStatus,setMoveStatus] = useState(0),
    [GameOver,setGameOver] = useState(),
    [myTurn,setMyTurn]=useState(props.Game ? props.Game.next_player.id === User.id : false),
    [asSelected,setAsSelected] = useState(false),
    [cardsPlayed,setCardsPlayed] = useState(props.Game.cards_played),
    [viewport_height,setViewport_Height] = useState(window.innerHeight),
    buttonSize = (viewport_height < 500) ? 'btn-sm' : '',
    buttonWidth = (viewport_height < 500) ? 'w-auto' : 'w-100',
    passMargin = (viewport_height < 500) ? 'ms-1' : ' my-4';
    console.log('Canvas',viewport_height);

    const { data, setData, post,get, processing, errors, reset } = useForm({
        user_id: User.id,
        game_id: Game ? Game.game_id : null,
        status : '',
        cards_played : {'cards_played':'','as':{'count':'','number':''}},
    });

    const MINUTE_MS = 4000;

    useEffect(() => {
        function handleResize() {
            // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
            setViewport_Height(window.innerHeight);
        }

        window.addEventListener('resize', handleResize)
    });

    useEffect(() => {
        const interval = !myTurn && setInterval(() => {
            if(!myTurn ) {
                Inertia.get(route('Check_Enemy_Move'),{GameId:props.Game.game_id,Example:'Example'},{
                    preserveScroll:true,
                    onSuccess:
                        (res)=> {
                            console.log(res.props.GameObject.winner);
                            if(!res.props.GameObject.winner){
                                res.props.Game && setNewState(res.props.Game);
                                res.props.Game && clearInterval(interval);
                                res.props.Game && setMyTurn(true);
                            }
                            else {
                                console.log('Game has ended, there is a winner');
                                Inertia.get(route('Winner'),data);
                            }
                        }
                });
            }
        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [Game]);



    function handlePlay() {
        data.status=1;
        if(asSelected)
            Inertia.post(route('Make_Move'),data,
         {only:['Game','GameObject'],preserveScroll:true,
                onSuccess:(res)=> {
             console.log(res.props)
                    if(!res.props.GameObject.winner) {
                        setNewState(res.props.Game);
                        reset('cards_played','status');
                    }
                    else {
                        console.log('Game has ended, there is a winner');
                        Inertia.get(route('Winner'),data);
                    }
                }});
    }

    function handleBluff() {
        data.status=2;
        setSelectedCards([]);
        data.cards_played = [];
        Inertia.post(route('Make_Move'),data,
            {only:['Game','GameObject'],preserveScroll:true,
                onSuccess:(res)=>   {
                console.log(res.props)
                    if(!res.props.GameObject.winner) {
                        setNewState(res.props.Game);
                        reset('cards_played','status');
                    }
                    else {
                        console.log('Game has ended, there is a winner');
                        Inertia.get(route('Winner'),data);
                    }
            }});
    }

    function handlePass() {
        data.status=3;
        setSelectedCards([]);
        data.cards_played = [];
        Inertia.post(route('Make_Move'),data,
            {only:['Game','GameObject'],preserveScroll:true,
                onSuccess:(res)=>   {
                    if(!res.props.GameObject.winner){
                        setNewState(res.props.Game);
                        reset('cards_played','status');
                    }
                    else {
                        console.log('Game has ended, there is a winner');
                        Inertia.get(route('Winner'),data);
                    }
            }});
    }

    function setNewState(NewState) {
        setGame(NewState);
        setCardsInStack(Array(NewState.cards_down).fill('Empty'));
        setSelectedCards([]);
        setMyCards(NewState.player_cards.player1.cards);
        setEnemyCards(Array(NewState.player_cards.player2.count).fill('Empty'));
        setMyTurn(false);
        setNextPlayer(NewState.next_player);
        setCards(NewState.player_cards);
        setCardsPlayed(NewState.cards_played);
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
        <HeightContext.Provider value={viewport_height}>
            <div className='container-fluid vh-100 w-100 position-relative p-2'>
                <div className='row h-100 p-0 mx-0'>
                    <div className='col-12 px-0'>
                        <div className='card h-100'>
                            <div className='card-body h-100 text-center' style={{background:"#295f48"}}>
                                <SelectedCardsContext.Provider value={{selectedCards,setSelectedCards}}>
                                    <TurnContext.Provider value={{myTurn,setMyTurn}}>
                                        <CardsContext.Provider value={{enemyCards,setEnemyCards}}>
                                                <Player Position='Top' Enemy={true}></Player>
                                        </CardsContext.Provider>
                                        <NextPlayerContext.Provider value={nextPlayer}>
                                            <CardsPlayedContext.Provider value={cardsPlayed}>
                                                <UserContext.Provider value={User}>
                                                    <CardStack cardStack={cardsInStack} selected={selectedCards} handleAs={handleAs}></CardStack>
                                                </UserContext.Provider>
                                            </CardsPlayedContext.Provider>
                                        </NextPlayerContext.Provider>
                                        <CardsContext.Provider value={{myCards,setMyCards}}>
                                            <StackContext.Provider value={cardsInStack.length}>
                                                <Player Position='Bottom' Enemy={false}
                                                        handleBluff={handleBluff} handlePass={handlePass}
                                                        handlePlay={handlePlay} onSubmit={submit} reset={reset}>
                                                    { selectedCards.length!==0 ?
                                                        <>
                                                            <Button className={'btn btn-info w-auto mx-3 my-1'} onClick={handlePlay}>{selectedCards.length  > 1 ? 'Play Cards' : 'Play Card'}</Button>
                                                        </>
                                                        :
                                                        <>
                                                            {cardsInStack.length === 0 && viewport_height > 500 && <h6>Play at least 1 card.</h6>}
                                                            <button className={'btn btn-danger ' + buttonSize + buttonWidth}  onClick={handlePass} disabled={cardsInStack.length === 0}>Pass</button>
                                                            <button className={'btn btn-warning ' + buttonSize + buttonWidth + passMargin} onClick={handleBluff} disabled={cardsInStack.length === 0}>Call Bluff</button>
                                                        </>}
                                                </Player>
                                            </StackContext.Provider>
                                        </CardsContext.Provider>
                                    </TurnContext.Provider>
                                </SelectedCardsContext.Provider>
                            </div>
                        </div>
                    </div>
                    {/*<div className='col-1 p-5' style={{background:"ghostwhite"}}>*/}
                    {/*    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"*/}
                    {/*            data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">*/}
                    {/*        Toggle*/}
                    {/*    </button>*/}
                    {/*    /!*{*!/*/}
                    {/*    /!*    Room.Game_Active &&*!/*/}
                    {/*    /!*<ScoreBoard Players={Players}>*!/*/}

                    {/*    /!*</ScoreBoard>}*!/*/}
                    {/*</div>*/}
                </div>
            </div>
        </HeightContext.Provider>
    )
}
