import React, {useEffect, useState} from 'react';
import '../../css/SideNav.css';
export function SideNav() {
    const [NavVisible, setNavVisible] = useState(false);

    useEffect(()=>{
        if(NavVisible)
            $('#SideNav').css('width', '250px');
        else
            $('#SideNav').css('width', '0');
    },[NavVisible])

    function handleClick(){
        setNavVisible(!NavVisible);
    }

    return (
        <>
            <span  id="openNav" onClick={handleClick}>&#9776; Open</span>
            <div id="SideNav" className="sidenav">
                <a id="closeNav" className="closebtn" onClick={handleClick}>&times;</a>
                <a id="">Make a Reservation</a>
                <a id="showMyReservations">My Reservations</a>
                <a id="showMyProfile">Profile</a>
                <a id="showMyAllergies">Allergies - Intolerances</a>
            </div>
        </>
    )
}
