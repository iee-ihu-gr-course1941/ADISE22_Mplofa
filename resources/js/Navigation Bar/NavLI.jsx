import uuid from "react-uuid";

export function NavLI(props) {
    return (
        <li key={uuid()} className='nav-item'>
            <a href={props.link} className='nav-link'>{props.name}</a>
        </li>
    )
}
