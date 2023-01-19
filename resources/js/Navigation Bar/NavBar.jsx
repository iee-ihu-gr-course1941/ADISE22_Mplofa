import {NavUL} from "./NavUL";
import {Link} from "@inertiajs/inertia-react";
import {Room} from "../Game Components/Room";

export function NavBar({Guest,InGame,GameId}) {
    const inGame = InGame ? InGame : false;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className={"container-fluid " + (inGame ? ' w-100 text-center' : '')}>
                <Link href={route('home')}>
                    <img src={'Images/card-game.png'} alt={'Bluffing'} className={'position-static'} width={64}></img>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target=".collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0 text-center"
                     id="navbarSupportedContent">
                    <Link href={route('logout')} method={'post'} as={'button'}
                          className="btn btn-outline-danger text-center nav-item" type="button" only={['Rooms']}>
                        Logout
                    </Link>
                    <a className={'btn btn-light'}
                       href="https://www.flaticon.com/free-icons/group" title="group icons">
                        Icons by Flaticon
                    </a>
                </div>
            </div>
        </nav>
    );
}
