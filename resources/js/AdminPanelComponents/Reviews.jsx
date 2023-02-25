import StarRating from "../Components/StarRating";
import {Link} from "@inertiajs/inertia-react";
import uuid from "react-uuid";
import {useState} from "react";
import {Pagination} from "./Pagination";

export function Reviews({Reviews}) {
    const BackgroundColor = {
        0:'#a11313',
        1:'#aa2a2a',
        2:'#b34242',
        3:'#d0ea40',
        4:'#9dec7b',
        5:'#50e710',
    },[searching,setSearching] = useState(false);
    const RatingOptions = [1,2,3,4,5].map((number)=> {
        return <Link key={number} href={route('AdminPanel')}  as={'button'} only={['Reviews']} name="btnradio" data={{rating:number}}
                     className={"btn btn-outline-secondary mt-4 btn-sm"} type="button" onClick={()=>setSearching(true)} preserveState={true}>
            {number} <span key={uuid()} className="star" style={{fontSize:"medium",color:'#ffea00'}}>&#9733;</span>
        </Link>
    });
    // <label className="btn btn-outline-primary btn-check" htmlFor="btnradio3">Radio 3</label>
    const ReviewList = Reviews.data.map((Review)=>{
        return <li key={Review.id} className="list-group-item d-flex justify-content-between align-items-start pb-2 pt-2 w-100">
            <div className={'card w-100'}>
                <div className={'card-header border-bottom-0 bg-transparent'} style={{color:BackgroundColor[Review.rating]}}>
                    <div className="fw-bold">
                        {Review.user}
                    </div>
                </div>
                <div className={'card-body'}>
                    <div className={'row w-100'}>
                        <div className={'col-12 col-lg-6'}>
                            <div className="ms-2 me-auto">
                                <div className={'row pb-0 pt-2'}>
                                    {/*<div className={'col-12'}>*/}
                                        <strong>Rating</strong>
                                        <StarRating Rating={Review.rating} readOnly={true}></StarRating>
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                        <div className={'col-12 col-lg-6 text-center'}>
                            <strong>Comment</strong>
                            <p className={'h-50 text-center'} style={{overflowY:"scroll"}}>{Review.comment}</p>
                        </div>
                    </div>
                </div>
                <div className={'card-footer bg-transparent'}>
                    <strong>Placed</strong>
                    <p>{Review.placed}</p>
                </div>
            </div>
        </li>
    });
    return (
            <div className={'p-2 text-center'}>
                <div className={'card h-50'}>
                    <div className={'card-header text-center'}>
                        <h5>Reviews</h5>
                        <div className="btn-group mb-3" role="group" aria-label="Basic radio toggle button group">
                            <Link key={'all'} href={route('AdminPanel')}  as={'button'} only={['Reviews']} name="btnradio" data={{rating:'All'}}
                                  className={"btn btn-outline-secondary mt-4 "} type="button" onClick={()=>setSearching(false)} preserveState={true}>
                                All
                            </Link>
                            {RatingOptions}
                        </div>
                    </div>
                    <div className={'card-body overflow-auto h-50'}>
                        <ul className="list-group list-group-flush text-center align-items-center">
                            {
                                Reviews.data.length !==0
                                    ?
                                ReviewList
                                    :
                                <li key={'none'} className="list-group-item">
                                    {
                                        searching
                                            ?
                                        'No reviews matching your criteria!'
                                            :
                                        'Nobody has submitted a review yet!'
                                    }
                                </li>
                            }
                        </ul>
                        <Pagination links={Reviews} className={''}></Pagination>
                    </div>
                </div>
            </div>
    )
}
