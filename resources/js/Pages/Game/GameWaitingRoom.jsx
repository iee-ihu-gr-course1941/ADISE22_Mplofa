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
    useEffect(() => {
        const timer = (!userLeft && !Room.Game_Active) && setTimeout(() => {
            if(!userLeft) {
                Inertia.get(route('Check_For_New_Player'),{RoomId:Room.id},
                    {onSuccess:(res)=> {
                            setRoom(res.props.Room);
                            if(res.props.Room.OwnerReady && res.props.Room.PlayerReady) {
                            // if(res.props.Room.Game_Active) {
                                Inertia.post(route('Activate_Room'),{RoomId:res.props.Room.id,GameId:res.props.Room.GameId},{
                                    preserveScroll:true,
                                    onSuccess:
                                        (res)=> {
                                            // console.log('First Game State has been instantiated, game will commence soon',res.props.Game);
                                        }
                                });
                            }
                        }});
            }
        }, MINUTE_MS);
        return () => clearTimeout(timer);
    }, [Room,userLeft]);

    return (
        <div className='container-fluid vh-100 vw-100 position-relative py-3 px-5 align-items-center overflow-auto' style={{background:"#EEEEEE"}}>
            <div className={'row align-items-center h-100 gx-0'}>
                <div className={'row align-items-center gx-0'}>
                    <h1 className={'text-center'}>
                        {props.Room.Name}
                    </h1>
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
                                        <Link href={route('Ready')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                              className="btn btn-outline-success w-25 mt-4" type="button" disabled={Room.OwnerReady}>
                                            Ready
                                        </Link>}
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
                                            <h5 className={'mb-1 mb-sm-5 text-success mt-3 mt-sm-5'}>Both Players are ready, the Game will commence shortly!</h5>
                                            :
                                            <h5 className={'mb-1 mb-sm-5  text-warning mt-3 mt-sm-5'}>Waiting for both players to be Ready!</h5>
                                    )
                                    :
                                    <h4 className={'mb-1 mb-sm-5  text-danger mt-3 mt-sm-5'}>Waiting on Another Player . . .</h4>
                            )
                        }
                        {/*</div>*/}
                        <Link href={route('Leave_Room')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                              className="btn btn-outline-danger w-25 mt-2 mt-sm-4" type="button" onClick={()=>{setUserLeft(true)}} disabled={Room.Game_Active}>
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
                                        <Link href={route('Ready')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                              className="btn btn-outline-success w-25 mt-4" type="button" disabled={Room.PlayerReady}>
                                            Ready
                                        </Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
