export function NavButton(props) {
    return (
        <li className='nav-item'>
            <button onClick={props.handleClick} className='nav-item btn'>{props.name}</button>
        </li>
    )
}
