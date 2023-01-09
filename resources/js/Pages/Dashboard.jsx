import {Head, Link, useForm} from "@inertiajs/inertia-react";
import Authenticated from "../Layouts/AuthenticatedLayout";
import {PersonalInfo} from "../Profile/PersonalInfo";
import {Rooms} from "../Profile/Rooms";
import {Inertia} from "@inertiajs/inertia";
import {useState} from "react";
import {Room} from "../Game Components/Room";

export default function Dashboard(props) {
    console.log(props);
    const  { data, setData, post, processing, errors, reset } = useForm({
        Name: "",
        Password: "",
        Capacity: 2,
    }), [RoomsList,setRooms] = useState(props.Rooms.Rooms),submit = (e) => {
        e.preventDefault();
        Inertia.post(route('New_Room'),data,{only:['Rooms'],onSuccess:(res)=>{setRooms(res.props.Rooms)}}
        );
    };

    return (
        <Authenticated>
            <Head title="Dashboard" ><title>Dashboard</title></Head>
                <div className='container p-3'>
                    <div className={'row'}>
                        {/*<div className={'col-6'}>*/}
                        {/*    <PersonalInfo User={props.auth.user}>*/}

                        {/*    </PersonalInfo>*/}
                        {/*</div>*/}
                        <div className={'col-12'}>
                            <Rooms rooms={RoomsList} onSubmit={submit} Data={{data, setData,errors}}>
                                <Link href={route('home')} data={{RoomId:Room.id}} as={'button'}
                                      className="btn btn-outline-dark text-center mt-4" type="button" only={['Rooms']}>
                                    Reload
                                </Link>
                            </Rooms>
                        </div>
                    </div>
                </div>
        </Authenticated>
    )
}
