import {Link} from "@inertiajs/inertia-react";

export function Room({Room}) {
    return (
        <div className="carousel-item active p-4 w-100">
            <div className='card border-0 p-3 shadow h-100 my-3 w-50 mx-auto'>
                <div className='card-title p-1 text-center'><h5>{Room.Name}</h5></div>
                <div className='card-body'>
                    <div className="row text-center">

                        <div className='col-12'>{Room.Owner && Room.Player ?
                            <div className={'col-3 mx-auto'}>
                                <img src={"/Images/social-group.png"} alt={"Players"}>
                                </img>
                            </div>
                            :
                            <div className={'col-3 mx-auto'}>
                                <img className={'me-2'} src={"/Images/UserIcon.png"} width={25} alt={"Players"}></img>
                            </div>}
                            <div className={'col-9 text-center mx-auto mt-3'}>
                                <h5>{Room.Owner.name}</h5><div><h5>{Room.Player && Room.Player.name}</h5></div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <Link href={route('Join_Room')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                  className="btn btn-success text-center mt-4 w-50 ms-5" type="button" disabled={Room.Owner && Room.Player}>
                                Join
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
