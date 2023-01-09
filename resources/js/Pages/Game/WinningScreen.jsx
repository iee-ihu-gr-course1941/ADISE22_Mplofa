import {Link} from "@inertiajs/inertia-react";
import {useState} from "react";

export default function WinningScreen(props) {
    const [Game,setGame] = useState(props.Game),
        Winner = props.Winner,
        Player1 = props.Player1,
        Player2 = props.Player2;

    return(
        <div className='container-fluid vh-100 vw-100 position-relative p-5' style={{background:"#EEEEEE"}}>
            {/*<div className={'row'}>*/}
            <h2 className={'text-center'}>{props.Room.Name}</h2>
            {/*</div>*/}
            <div className='row h-100 p-0 mx-0 align-items-center my-5'>
                <div className='col-6 px-0 text-center h-100 py-5 align-items-center my-5'>
                    <div className='card border-1 p-2 h-50 shadow-lg mt-5' style={{background:"#e6e6e6"}}>
                        <div className='card-title p-1 text-center mt-5'><h4>{Player1.Name}</h4></div>
                        <div className='card-body'>
                            <div className={'row'}>
                                {Winner.id === Player1.id ? <h4 className={'text-success'}>Victory</h4> : <h4 className={'text-danger'}>Defeat</h4>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6 px-0 text-center h-100 py-5 align-items-center my-5'>
                    <div className='card border-1 p-2 h-50 shadow-lg mt-5' style={{background:"#e6e6e6"}}>
                        <div className='card-title p-1 text-center mt-5'><h4>{props.Room.Player ? props.Room.Player.name : 'Empty Seat'}</h4></div>
                        <div className='card-body'>
                            <div className={'row'}>
                                {Winner.id === Player2.id ? <h4 className={'text-success'}>Victory</h4> : <h4 className={'text-danger'}>Defeat</h4>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
