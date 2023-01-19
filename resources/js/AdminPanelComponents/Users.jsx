import {Pagination} from "./Pagination";

export function Users({Users}) {
    console.log(Users)
    const UserList = Users.data.map((User)=>{
        return <li  key={User.email} className="list-group-item d-flex justify-content-between align-items-start pb-0 pt-2">
            <div className="mx-auto">
                <div className="fw-bold border-bottom border-1 pb-1">
                    {User.name}
                </div>
                <div className={'row pb-0 pt-2'}>
                    {/*<div className={'col-12 col-md-6 col-lg-8 px-1'}>*/}
                    {/*    <strong>Email</strong>*/}
                    {/*    <p>{User.email}</p>*/}
                    {/*</div>*/}
                    {/*col-md-6 col-lg-4*/}
                    <div className={'col-12  px-1'}>
                        <strong>Joined</strong>
                        <p>{User.joined}</p>
                    </div>
                </div>
            </div>
            <span className="badge bg-primary rounded-pill">{User.points}</span>
        </li>
    });
    console.log(Users)
    return (
        <div className={'card h-50'}>
            <div className={'card-header text-center'}>
                <h5>Users</h5>
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
