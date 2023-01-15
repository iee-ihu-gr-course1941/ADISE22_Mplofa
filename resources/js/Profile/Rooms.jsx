import {Room} from "../Game Components/Room";
import {FormFloatingTextInput} from "../Components/FormFloatingTextInput";
import InputError from "../Components/InputError";
import {useState} from "react";
import {Link} from "@inertiajs/inertia-react";


export function Rooms({rooms,onSubmit,Data,children}) {
    const Rooms = rooms.map((RoomObj)=> {
        return <Room key={RoomObj.id} Room={RoomObj}></Room>
    }), [hasPassword,setHasPassword] = useState(false),
        {data,setData,errors} = Data;

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    return (
        <div className='card border-0 p-1 shadow h-100 gx-0' style={{background:"#AFBEC1"}}>
            <div className='card-title p-1 text-center'><h2>Rooms</h2>
                {children}
            </div>
            <div className='card-body p-2'>
                <div className="row gx-0 justify-content-center">
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
                        <div className="carousel-inner justify-items-center">
                            {Rooms.length === 0 ? <div className={'text-center my-4'}><h4>There are no active Rooms!</h4></div> : Rooms}
                            <div className="carousel-indicators">
                                {rooms.map((room,index)=>{
                                    return <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index}
                                                   className="active" aria-current="true" aria-label={index}></button>
                                })}
                            </div>
                        </div>
                        <div>
                            <button className="carousel-control-prev me-1" type="button"
                                    data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                        </div>
                        <div>
                            <button className="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    {/*<div className={"row m-2 text-center justify-content-center gx-0"}>*/}
                        <button className="btn btn-outline-primary w-25 text-center" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            Create
                        </button>
                    {/*</div>*/}
                </div>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample"
                     aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h3 className="offcanvas-title" id="offcanvasExampleLabel">Create New Room</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <form onSubmit={onSubmit} className='p-4'>
                            <div className="row justify-content-center">
                                <FormFloatingTextInput
                                    type='text'
                                    name='Name'
                                    value={data.Name}
                                    required={true}
                                    handleChange={onHandleChange}
                                    placeHolder='Name'
                                ></FormFloatingTextInput>
                                <InputError message={errors.Name} className="mt-2" />
                                <FormFloatingTextInput
                                    type='text'
                                    name='Capacity'
                                    value={2}
                                    required={true}
                                    handleChange={onHandleChange}
                                    placeHolder='Capacity'
                                    disabled={true}
                                ></FormFloatingTextInput>
                                <InputError message={errors.Capacity} className="mt-2" />
                                <h6 className='ps-3 text-center'>Password</h6>
                                        <input className="form-check-input my-3" type="checkbox" value="" checked={hasPassword}
                                               onChange={()=>setHasPassword(!hasPassword)} aria-label="Checkbox for following text input"/>
                                {hasPassword && <> <FormFloatingTextInput
                                    type='text'
                                    name='Password'
                                    value={data.Password}
                                    required={false}
                                    handleChange={onHandleChange}
                                    placeHolder='Password'
                                ></FormFloatingTextInput>
                                    <InputError message={errors.Password} className="mt-2" /></>}
                                <button className='btn btn-primary btn-sm'>Create Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
