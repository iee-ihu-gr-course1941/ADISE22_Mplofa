import {Link, useForm} from "@inertiajs/inertia-react";
import {useState} from "react";
import StarRating from "../../Components/StarRating";

export default function WinningScreen(props) {
    console.log(props)
    const [Game,setGame] = useState(props.Game),
        Winner = props.Winner,
        Player1 = props.Player1,
        Player2 = props.Player2,
        User = props.auth.user,
        data = {
                user_id: User.id,
                bug_text : '',
                bug_found_at : '',
            }

    console.log(data)
    return(
        <div className='container-fluid vh-100 vw-100 position-relative py-2 pt-sm-3 px-3 px-sm-5 ' style={{background:"#EEEEEE"}}>
            {/*<div className={'row'}>*/}
            {/*<h2 className={'text-center'}>{props.Room.name}</h2>*/}
            {/*</div>*/}
            <div className='row p-0 mx-0 align-items-center text-center h-75'>
                <div className={'row vw-100'}>
                    {Winner.id === User.id ? <h1 className={'text-success'}>You WIN</h1> : <h1 className={'text-danger'}>You Lose</h1>}
                </div>
                <div className={'row px-0 my-0 gx-0'}>
                    <div className='col-12 col-sm-4 text-center align-items-center my-3 order-0'>
                        <div className='card border-1 p-2 h-100 shadow-lg' style={{background:"#e6e6e6"}}>
                            <div className='card-title p-1 text-center mt-5'><h4>{Player1.name}</h4></div>
                            <div className='card-body'>
                                <div className={'row'}>
                                    {Winner.id === Player1.id ? <h4 className={'text-success'}>Victory</h4> : <h4 className={'text-danger'}>Defeat</h4>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'col-12 col-sm-4 text-center h-auto align-items-center order-2 order-sm-1 p-3'}>
                        <StarRating onSetRating={(rating)=>{data.rating = rating;console.log(data)}} className={'my-auto'} User={User}>
                        </StarRating>
                    </div>
                    <div className='col-12 col-sm-4 text-center align-items-center my-3 order-1 order-sm-2'>
                        <div className='card border-1 p-2 h-100 shadow-lg' style={{background:"#e6e6e6"}}>
                            <div className='card-title p-1 text-center mt-5'><h4>{Player2.name}</h4></div>
                            <div className='card-body'>
                                <div className={'row'}>
                                    {Winner.id === Player2.id ? <h4 className={'text-success'}>Victory</h4> : <h4 className={'text-danger'}>Defeat</h4>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
