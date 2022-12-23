import React, {useEffect, useState} from 'react';

import '../../../css/Login._Register.css';
import Register from "./Register";
import Login from "./Login";
import Overlay from "./Overlay";


export default function Login_Register(Data) {

    const [IsVisible, setIsVisible] = useState(Data.Active);
    let container = $("#container");
    const active = IsVisible  === 'Register' ?  'container right-panel-active' : 'container';
    useEffect(()=> {
        if (IsVisible === 'Register')
            container.addClass("right-panel-active");
        else if(IsVisible === 'Login')
            container.removeClass("right-panel-active");
    },[IsVisible]);

    return (
        <div className={active + 'container'} id="container" >
            {/*<div className='row'><h1>Hi</h1></div>*/}
            <div className='row'>
                <div className='col-md-6'><Register></Register></div>
                <div className='col-md-6'><Login></Login></div>
                <Overlay setVisibility={setIsVisible}></Overlay>
            </div>
            {/*<div className='row'></div>*/}
        </div>
    );

}
