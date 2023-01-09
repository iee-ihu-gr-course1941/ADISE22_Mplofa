import {NavUL} from "./NavUL";

export function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src={'Images/card-game.png'} alt={'Bluffing'} width={64}></img>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target=".collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <NavUL Guest = {props.Guest}></NavUL>
                    <a className={'btn btn-light'} href="https://www.flaticon.com/free-icons/group" title="group icons">Icons by Flaticon</a>
                </div>
            </div>
        </nav>
    );
}
