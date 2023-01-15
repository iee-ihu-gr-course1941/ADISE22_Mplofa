import {Link} from "@inertiajs/inertia-react";
import {UserContext} from "../Contexts/UserContext";
import {useContext} from "react";

export function Room({Room,auth}) {
    const User = useContext(UserContext);
    return (
        <div className="carousel-item active p-4 w-100">
            <div className='card border-0 p-3 shadow h-100 my-3 w-75 mx-auto'>
                <div className='card-title p-1 text-center'><h5>{Room.Name}</h5></div>
                <div className='card-body'>
                    <div className="row text-center gx-0">
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
                                <h5>{Room.Owner && Room.Owner.name}</h5><div><h5>{Room.Player && Room.Player.name}</h5></div>
                            </div>
                        </div>
                        <div className="row justify-items-center justify-content-lg-center gx-0 mx-auto">
                            <Link href={route('Join_Room')} method={'post'} data={{RoomId:Room.id}} as={'button'}
                                  className="btn btn-success text-center mt-4 w-50 mx-auto" type="button"
                                  disabled={(Room.Owner && Room.Player) ||
                                      ((Room.Owner && Room.Owner.id === User.id) ||
                                          (Room.Player && Room.Player.id === User.id))}>
                                Join
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
