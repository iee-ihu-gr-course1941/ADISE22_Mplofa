import {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Link} from "@inertiajs/inertia-react";

export default function GameWaitingRoom(props) {
    const [Room,setRoom] = useState(props.Room),
        User = props.auth.user,
        [userLeft,setUserLeft] = useState(false),
        // [cantClickReady,setCantClickReady] = useState(true),
    MINUTE_MS = 5000;

    // useEffect(()=> {
    //     const timer = setTimeout(() => {
    //         setCantClickReady(false);
    //     }, 7500);
    //     return () => clearTimeout(timer);
    // },[])
    console.log(Room)
    useEffect(() => {
        const timer = (!userLeft && !Room.Game_Active) && setTimeout(() => {
            console.log('Checking if another player has joined!');
            userLeft && console.log(User.name,' has left the Room!');
            if(!userLeft) {
                Inertia.get(route('Check_For_New_Player'),{RoomId:Room.id},
                    {onSuccess:(res)=> {
                            setRoom(res.props.Room);
                            console.log('res',res.props.Room);
                            if(res.props.Room.OwnerReady && res.props.Room.PlayerReady) {
                            // if(res.props.Room.Game_Active) {
                                console.log("Activating Room, Initiating Game");
                                Inertia.post(route('Activate_Room'),{RoomId:res.props.Room.id,GameId:res.props.Room.GameId},{
                                    preserveScroll:true,
                                    onSuccess:
                                        (res)=> {
                                            console.log('First Game State has been instantiated, game will commence soon',res.props.Game);
                                        }
                                });
                            }
                        }});
            }
        }, MINUTE_MS);

        return () => clearTimeout(timer);
    }, [Room,userLeft]);

    return (
        <div className='container-fluid vh-100 vw-100 position-relative p-5' style={{background:"#EEEEEE"}}>
            {/*<div className={'row'}>*/}
                <h2 className={'text-center'}>{props.Room.Name}</h2>
            {/*</div>*/}
            <div className='row h-100 p-0 mx-0 align-items-center my-5'>
                <div className='col-4 px-0 text-center h-100 py-5 align-items-center my-5'>
                    <div className='card border-1 p-2 h-50 shadow-lg mt-5' style={{background:"#e6e6e6"}}>
                        <div className='card-title p-1 text-center mt-5'><h4>{props.Room.Owner.name}</h4></div>
                        <div className='card-body'>
                            <div className={'row'}>
                                {Room.OwnerReady ? <h5 className={'mt-5 text-success'}>Player is Ready</h5>: <h5 className={'mt-5 text-warning'}>Player is not Ready</h5>}
                            </div>
                            <div className={'row justify-content-center'}>
                                {User.id === Room.Owner.id &&
                                    <Link href={route('Ready')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                        className="btn btn-outline-success w-25 mt-4" type="button" disabled={Room.OwnerReady}>
                                    Ready
                                </Link>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col-4 my-0 text-center mb-5'}>
                    <div className={'row mb-5'}>
                        {
                            (
                                Room.Player
                                    ?
                                    (
                                        props.Room.OwnerReady && props.Room.PlayerReady
                                            ?
                                            <h5 className={'mb-5 text-success'}>Both Players are ready, the Game will commence shortly!</h5>
                                            :
                                            <h5 className={'mb-5 text-warning'}>Waiting for both players to be Ready!</h5>
                                    )
                                    :
                                    <h4 className={'mb-5 text-danger'}>Waiting on Another Player . . .</h4>
                            )
                        }
                    </div>
                    <Link href={route('Leave_Room')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                          className="btn btn-outline-danger w-25 mt-4" type="button" onClick={()=>{setUserLeft(true)}} disabled={Room.Game_Active}>
                        Leave Room
                    </Link>
                </div>
                <div className='col-4 px-0 text-center h-100 py-5 align-items-center my-5'>
                    <div className='card border-1 p-2 h-50 shadow-lg mt-5' style={{background:"#e6e6e6"}}>
                        <div className='card-title p-1 text-center mt-5'><h4>{props.Room.Player ? props.Room.Player.name : 'Empty Seat'}</h4></div>
                        <div className='card-body'>
                            <div className={'row'}>
                                {Room.Player ? (Room.PlayerReady ? <h5 className={'mt-5 text-success'}>Player is Ready</h5> : <h5 className={'mt-5 text-warning'}>Player is not Ready</h5>)
                                    : <h5 className={'mt-5 text-danger'}>No player has joined yet!</h5>}
                            </div>
                            <div className={'row justify-content-center'}>
                                {Room.Player && User.id === Room.Player.id &&
                                    <Link href={route('Ready')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                          className="btn btn-outline-success w-25 mt-4" type="button" disabled={Room.PlayerReady}>
                                        Ready
                                    </Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div>*/}

            {/*</div>*/}
        </div>
    )
}
