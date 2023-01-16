import StarRating from "../Components/StarRating";

export function Reviews({Reviews}) {
    const ReviewList = Reviews.map((Review)=>{
        return <li key={Review.id} className="list-group-item d-flex justify-content-between align-items-start pb-2 pt-2 w-100">
            <div className={'card w-100'}>
                <div className={'card-header border-bottom-0 bg-transparent'}>
                    <div className="fw-bold">
                        {Review.user}
                    </div>
                </div>
                <div className={'card-body '}>
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
        <div className={'card h-50'}>
            <div className={'card-header text-center'}>
                <h5>Reviews</h5>
            </div>
            <div className={'card-body overflow-auto'}>
                <ul className="list-group list-group-flush text-center align-items-center">
                    {Reviews ? ReviewList : <li className="list-group-item">Nobody has placed a review yet.</li>}
                </ul>
            </div>
        </div>
    )
}
