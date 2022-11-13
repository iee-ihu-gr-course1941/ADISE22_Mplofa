import {NavUL} from "./NavUL";

export function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Logo Goes Here</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target=".collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <NavUL Guest = {props.Guest}></NavUL>
                    {/*<form className="d-flex">*/}
                    {/*    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                    {/*        <button className="btn btn-outline-success" type="submit">Search</button>*/}
                    {/*</form>*/}
                </div>
            </div>
        </nav>
    );
}
