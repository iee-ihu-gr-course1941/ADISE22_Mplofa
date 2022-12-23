import {NavButton} from "./NavButton";
import {NavLI} from "./NavLI";
import {useForm} from "@inertiajs/inertia-react";

export function NavUL(props) {
    const { data, setData, post, processing, errors, reset } = useForm({});

    function handleLogout() {
        post(route('logout'));
    }

    const LoggedOptions = <>
            <NavLI  link='http://127.0.0.1:8000/' name='Play'></NavLI>
            <NavLI link={route('dashboard')} name='Dashboard'></NavLI>
            <NavButton handleClick={handleLogout} name='Logout'></NavButton>
        </>,
        GuestOptions = <>
            <NavLI link={route('login')} name='Log In'></NavLI>
            <NavLI link={route('register')} name='Register'></NavLI>
        </>;
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className='navbar-nav'>
                {props.Guest ? GuestOptions : LoggedOptions}
            </ul>
        </div>
    );
}
