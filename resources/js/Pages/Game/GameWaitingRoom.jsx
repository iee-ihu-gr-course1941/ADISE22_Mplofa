import {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Link} from "@inertiajs/inertia-react";

export default function GameWaitingRoom(props) {
    console.log(props.Room)
    const [Room,setRoom] = useState(props.Room),
        User = props.auth.user,
        [canClickReady,setCanClickReady] = useState(),MINUTE_MS = 5000,
        [hasInitiatedGame,setHasInitiatedGame] = useState(false),
        [copied,setCopied] = useState(false);

    useEffect(() => {
        window.addEventListener('beforeunload', ()=>{
            Inertia.post(route('Leave_Room'),{RoomId:Room.id});
        });
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
                Inertia.get(route('Check_For_New_Player'),{RoomId:Room.id},
                    {onSuccess:(res)=> {
                            setRoom(res.props.Room);
                            console.log(res.props)
                            if(!canClickReady)
                                setCanClickReady(true);
                            if(res.props.Room.OwnerReady && res.props.Room.PlayerReady && !hasInitiatedGame) {
                            // if(res.props.Room.Game_Active) {
                                Inertia.post(route('Activate_Room'),{ RoomId:res.props.Room.id,
                                    GameId:res.props.Room.GameId},{
                                    preserveScroll:true,
                                    onSuccess:
                                        (res)=> {
                                        setHasInitiatedGame(true);
                                        console.log('hasInitiatedGame',hasInitiatedGame);
                                        clearTimeout(timer)
                                        },preserveState:true
                                });
                            }
                        },preserveState:true});
        }, MINUTE_MS);
        return () => clearTimeout(timer);
    });
    useEffect(() => {
        const timer = copied && setTimeout(() => {
            setCopied(!copied);
        }, 3500);
        return () => clearTimeout(timer);
    },[copied]);

    return (
        <div className='container-fluid vh-100 vw-100 position-relative py-3 px-5 align-items-center overflow-auto' style={{background:"#EEEEEE"}}>
            <div className={'row align-items-center h-100 gx-0'}>
                <div className={'row align-items-center gx-0'}>
                    <h1 className={'text-center'}>
                        {props.Room.Name}
                    </h1>
                        {User.id === Room.Owner.id && Room.Password && <button className={'btn btn-sm btn-outline-secondary w-50 mx-auto mt-2'}
                                                                               onClick={() => {
                                                                                   navigator.clipboard.writeText(Room.Password && Room.Password)
                                                                                   setCopied(true);
                                                                               }}>
                            {copied ? 'Copied' :'Copy Room Password'}
                        </button>}
                </div>
                <div className='row px-0 gx-0 mb-sm-5 py-sm-5'>
                    <div className='col-12 col-sm-4 text-center align-items-center my-3 order-0'>
                        <div className='card border-1 p-2 h-100 shadow-lg' style={{background:"#e6e6e6"}}>
                            <div className='card-title p-1 text-center mt-5'>
                                <h4>
                                    {props.Room.Owner.name}
                                </h4>
                            </div>
                            <div className='card-body'>
                                <div className={'row'}>
                                    {Room.OwnerReady ? <h5 className={'mt-5 text-success'}>Player is Ready</h5>: <h5 className={'mt-5 text-warning'}>Player is not Ready</h5>}
                                </div>
                                <div className={'row justify-content-center'}>
                                    {User.id === Room.Owner.id &&
                                        <div className={'col-12 col-lg-6'}>
                                            <Link href={route('Ready')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                                  className="btn btn-outline-success mt-4" type="button" disabled={!canClickReady ||  Room.OwnerReady}>
                                                Ready
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'col-12 col-sm-4 text-center h-auto align-items-center order-2 order-sm-1'}>
                        {/*<div className={'row mb-5'}>*/}
                        {
                            (
                                Room.Player
                                    ?
                                    (
                                        props.Room.OwnerReady && props.Room.PlayerReady
                                            ?
                                            <h5 className={'mb-1 mb-sm-5 text-success mt-3 mt-sm-5 mx-2'}>Both Players are ready, the Game will commence shortly!</h5>
                                            :
                                            <h5 className={'mb-1 mb-sm-5  text-warning mt-3 mt-sm-5 mx-2'}>Waiting for both players to be Ready!</h5>
                                    )
                                    :
                                    <h4 className={'mb-1 mb-sm-5  text-danger mt-3 mt-sm-5'}>Waiting on Another Player . . .</h4>
                            )
                        }
                        {/*</div>*/}
                        <Link href={route('Leave_Room')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                              className="btn btn-outline-danger mt-2 mt-sm-4" type="button" disabled={Room.Game_Active}>
                            Leave Room
                        </Link>
                    </div>
                    <div className='col-12 col-sm-4 text-center align-items-center my-3 order-1 order-sm-2'>
                        <div className='card border-1 p-2 h-100 shadow-lg' style={{background:"#e6e6e6"}}>
                            <div className='card-title p-1 text-center mt-5'>
                                <h4>
                                    {props.Room.Player ? props.Room.Player.name : 'Empty Seat'}
                                </h4>
                            </div>
                            <div className='card-body'>
                                <div className={'row'}>
                                    {Room.Player ? (Room.PlayerReady ? <h5 className={'mt-5 text-success'}>Player is Ready</h5> : <h5 className={'mt-5 text-warning'}>Player is not Ready</h5>)
                                        : <h5 className={'mt-5 text-danger'}>No player has joined yet!</h5>}
                                </div>
                                <div className={'row justify-content-center'}>
                                    {Room.Player && User.id === Room.Player.id &&
                                    <div className={'col-12 col-lg-10'}>
                                        <Link href={route('Ready')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                              className="btn btn-outline-success mt-4" type="button" disabled={!canClickReady || Room.PlayerReady}>
                                            Ready
                                        </Link>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
