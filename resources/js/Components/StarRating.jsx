import {useEffect, useState} from "react";
import {Link} from "@inertiajs/inertia-react";

export default function StarRating({className,readOnly,numberOfStars,onSetRating,User}) {
    const [rating, setRating] = useState(0),
    [hover, setHover] = useState(0),
    NoOfStars = numberOfStars ? numberOfStars : 5,
    ReadOnly = readOnly ? readOnly : false,
    classes = className ? className : '',
    onRatingSet = !ReadOnly && onSetRating ? onSetRating : ()=>{},
    data = {
        user_id:User.id,
        text:"",
        rating:0,
    },
    [submitted,setSubmitted] = useState(false),
        [viewport_height,setViewport_Height] = useState(window.innerHeight),
        buttonSize = (viewport_height < 800) ? ' w-100' : ' w-25';
    console.log(viewport_height)
    useEffect(() => {
        function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
            setViewport_Height(window.innerHeight);
        }

        window.addEventListener('resize', handleResize)
    });
    return (
        <>
            {!submitted ? <div className={"text-center " + classes}>
                <div>
                    <h4>How would you rate your game experience?</h4>
                    {
                        [...Array(NoOfStars)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={'border-0 btn btn-lg'}
                                    onClick={
                                        () => {
                                            if(!ReadOnly){
                                                setRating(index);
                                                data.rating = index;
                                                // onRatingSet(index);
                                            }
                                        }
                                    }
                                    style={index <= (hover || rating) ? {color:'#ffea00'} : {color:'#ccc'}}
                                    onMouseEnter={() => {
                                        !ReadOnly && setHover(index)
                                    }}
                                    onMouseLeave={() => {
                                        !ReadOnly && setHover(rating)
                                    }}
                                    onDoubleClick={() => {
                                        if(!ReadOnly){
                                            setRating(0);
                                            data.rating = 0;
                                            // onRatingSet(0);
                                        }
                                    }}
                                >
                                    <span className="star" style={{fontSize:"x-large"}}>&#9733;</span>
                                </button>
                            );
                        })
                    }
                </div>
                <div className={'row w-75 mx-auto my-3 text-center justify-content-center'}>
                <textarea className={'border-2 text-center'}
                          placeholder={'What do you think, would make the game better?'}
                          style={{resize:'none',backgroundColor:'#eeeeee'}} onChange={(event)=>
                {data.text = event.target.value;console.log(data)}}>
                </textarea>
                    <Link href={route('Submit_Review')} method={'post'} as={'button'} data={data}
                          className={"btn btn-outline-primary mt-4" + buttonSize} type="button" onSuccess={()=>{setSubmitted(true)}}>
                        Submit
                    </Link>
                </div>
            </div> : <h4 className={'text-success'}>Thank you for your review.</h4>}
        </>
    );
}
