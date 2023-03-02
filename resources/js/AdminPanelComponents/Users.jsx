import {Pagination} from "./Pagination";
import {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";

export function Users({Users,IEEs}) {
    const
        // [showingIEES,setShowingIEES] = useState(false),
    UserList = Users.data.map((User)=>{
        return <li  key={User.email} className="list-group-item d-flex justify-content-between align-items-start pb-0 pt-2">
            {User.isIEE && <span className="badge bg-success rounded-pill">IEE</span>}
            <div className="mx-auto">
                <div className="fw-bold border-bottom border-1 pb-1">
                    {User.name}
                </div>
                <div className={'row pb-0 pt-2'}>
                    <div className={'col-12  px-1'}>
                        <strong>Joined</strong>
                        <p>{User.joined}</p>
                        <p className={'fw-bold'}>Ref : {User.refUser ? User.refUser.name : 'None'}</p>
                    </div>
                </div>
            </div>
            <span className="badge bg-primary rounded-pill">{User.points}</span>
        </li>
    });
    // useEffect(()=>{
    //     Inertia.get(route('AdminPanel'),{IEE:showingIEES},{only:['Users']});
    // },[showingIEES]);
    return (
        <div className={'card h-50 mt-md-5 mt-4 mt-sm-5 mt-lg-0'}>
            <div className={'card-header text-center'}>
                <h5>Users</h5>
                {<span className="badge bg-success rounded-pill"
                       // onClick={()=>{setShowingIEES(!showingIEES);}}
                >IEE's : {IEEs}</span>}
            </div>
            <div className={'card-body'} style={{overflowX:'hidden',overflowY:'auto'}}>
                <ul className="list-group list-group-flush text-center">
                    {Users ? UserList : <li key={'none'} className="list-group-item">No Users have signed up</li>}
                </ul>
            </div>
            <div className={'card-footer bg-transparent pt-3 pb-0 px-0'}>
                <Pagination links={Users} className={''}></Pagination>
            </div>
        </div>
    )
}

{/*<div className={'col-12 col-md-6 col-lg-8 px-1'}>*/}
{/*    <strong>Email</strong>*/}
{/*    <p>{User.email}</p>*/}
{/*</div>*/}
{/*col-md-6 col-lg-4*/}
