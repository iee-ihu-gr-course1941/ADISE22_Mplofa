import {Link} from "@inertiajs/inertia-react";
import {Pagination} from "./Pagination";
import StarRating from "../Components/StarRating";

export function Bugs({Bugs}) {
    const Links = Bugs.links;
    console.log(Bugs)
    const BugList = Bugs.data.map((Bug)=>{
        return <li key={Bug.id} className="list-group-item d-flex justify-content-between align-items-start pb-2 pt-2 w-100">
            <div className={'card w-100'}>
                <div className={'card-header border-bottom-0 bg-transparent'}>
                    <div className={'row w-100 mx-0'}>
                        <div className={'col-12 col-sm-8'}>
                            <div className="fw-bold">
                                {Bug.user.name}
                            </div>
                        </div>
                        <div className={'col-12 col-sm-4'}>
                            {
                                Bug.resolved ?
                                    <div className={'row w-100 text-center mx-0'}>
                                        <div className={'col-12 col-md-4 '}>
                                            <Link href={route('Resolve_Bug')} method={'post'} data={{BugID:Bug.id}} as={'button'}
                                                  className="btn px-0" type="button">
                                                <img src={'Images/accept.png'} style={{width:30,height:30}} alt={'Resolved'}></img>
                                            </Link>
                                        </div>
                                        <div className={'col-12 col-md-8 px-0'}>
                                            <p className={'py-2 fw-bold'}>Resolved</p>
                                        </div>
                                    </div>
                                    :
                                    <div className={'row w-100 mx-0'}>
                                        <div className={'col-12 col-md-4 px-0'}>
                                            <Link href={route('Resolve_Bug')} method={'post'} data={{BugID:Bug.id}} as={'button'}
                                                  className="btn px-0" type="button">
                                                <img src={'Images/remove.png'} style={{width:30,height:30}} alt={'Unresolved'}></img>
                                            </Link>
                                        </div>
                                        <div className={'col-12 col-md-8 px-0'}>
                                            <p className={'py-2 fw-bold'}>Unresolved</p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={'card-body text-center'}>
                    <div className={'row w-100'}>
                        <div className={'col-12 col-xl-2'}>
                            <div className="ms-2 me-auto">
                                <div className={'row pb-0 pt-2 mx-0'}>
                                    {/*<div className={'col-12'}>*/}
                                    <strong>Device</strong>
                                    <p>{Bug.encountered_at}</p>
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                        <div className={'col-12 col-xl-10 text-center ps-4 pe-0'}>
                            <strong>Description</strong>
                            <p className={'text-center h-75'} style={{overflowY:"scroll"}}>{Bug.description}</p>
                        </div>
                    </div>
                </div>
                <div className={'card-footer bg-transparent'}>
                    <strong>Placed</strong>
                    <p className={'mb-0'}>{Bug.placed}</p>
                </div>
            </div>
        </li>
    });
    return (
        <div className={'text-center mt-md-0 mt-sm-4 mt-lg-0 mt-4 h-75'}>
            <div className={'card '}>
                <div className={'card-header text-center'}>
                    <h5>Bugs</h5>
                    <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
                        {/*<Link key={'all'} href={route('AdminPanel')}  as={'button'} only={['Reviews']} name="btnradio" data={{rating:'All'}}*/}
                        {/*      className={"btn btn-outline-secondary mt-4 "} type="button"*/}
                        {/*      onClick={()=>setSearching(false)} preserveState={true}>*/}
                        {/*    All*/}
                        {/*</Link>*/}
                        {/*{RatingOptions}*/}
                    </div>
                </div>
                <div className={'card-body overflow-auto h-50'}>
                    <ul className="list-group list-group-flush text-center align-items-center">
                        {
                            Bugs.data.length !==0
                                ?
                                BugList
                                :
                                <li className={'list-group-item'}>No Bugs have been submitted yet!</li>
                                // <li key={'none'} className="list-group-item">
                                //     {
                                //         searching
                                //             ?
                                //             'No reviews matching your criteria!'
                                //             :
                                //             'Nobody has submitted a review yet!'
                                //     }
                                // </li>
                        }
                    </ul>

                </div>
                <div className={'card-footer bg-transparent pt-3 pb-0 px-0'}>
                    <Pagination links={Bugs} className={''}></Pagination>
                </div>
            </div>
        </div>
    )
}
