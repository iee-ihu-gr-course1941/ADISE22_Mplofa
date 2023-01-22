import {Head, Link, useForm} from "@inertiajs/inertia-react";
import Authenticated from "../Layouts/AuthenticatedLayout";
import {PersonalInfo} from "../Profile/PersonalInfo";
import {Rooms} from "../Profile/Rooms";
import {Inertia} from "@inertiajs/inertia";
import {useEffect, useState} from "react";
import {Room} from "../Game Components/Room";
import {UserContext} from "../Contexts/UserContext";
import {BeforeYouPlay} from "../Profile/BeforeYouPlay";
import {BugSubmissionForm} from "../Bugs/BugSubmissionForm";

export default function Dashboard(props) {
    const  { data, setData, post, processing, errors, reset } = useForm({
        Name: "",
        Password: "",
        Capacity: 2,
    }), [RoomsList,setRooms] = useState(props.Rooms.Rooms),submit = (e) => {
        e.preventDefault();
        Inertia.post(route('New_Room'),data,{only:['Rooms'],onSuccess:(res)=>{setRooms(res.props.Rooms)}}
        );
    },[roomDoesntExistErrorVisible,setRoomDoesntExistErrorVisible] = useState(!!props.errors.Room_Doesnt_Exist);

    useEffect(()=> {
        const AlertVisible = roomDoesntExistErrorVisible && setTimeout(() => {
            setRoomDoesntExistErrorVisible(false);
            Inertia.reload({only:['Rooms']});
        }, 3000);

        return ()=>clearTimeout(AlertVisible);
    },[props.errors]);

    useEffect(()=>  {
        document.title = 'Home';
    });

    return (
        <Authenticated>
            <Head title="Dashboard" >
                <title>Dashboard</title>
            </Head>
                <div className='container p-3 h-100 vw-100'>
                    <div className={'row gx-0'}>
                        {/*<div className={'col-6'}>*/}
                        {/*    <PersonalInfo User={props.auth.user}>*/}

                        {/*    </PersonalInfo>*/}
                        {/*</div>*/}
                        <div className={'col-12 text-center h-auto'}>
                            <div className={'row'}>
                                <div className={'col'}>
                                    <button type="button btn-sm w-25" className="btn btn-outline-danger mb-3" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal">
                                        Please read before you play!
                                    </button>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col'}>
                                    <UserContext.Provider value={props.auth.user}>
                                        <Rooms rooms={RoomsList} onSubmit={submit} Data={{data, setData, errors}}>
                                            <Link href={route('home')} data={{RoomId:Room.id}} as={'button'}
                                                  className="btn btn-outline-dark text-center mt-4" type="button" only={['Rooms']}>
                                                Reload
                                            </Link>
                                        </Rooms>
                                    </UserContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className={'row align-self-end text-center'}>*/}
                    {/*    <div className={'col'}>*/}
                    {/*        <div className={'col-12 mt-5'}>*/}
                    {/*            <BugSubmissionForm>*/}

                    {/*            </BugSubmissionForm>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            <BeforeYouPlay>

            </BeforeYouPlay>
        </Authenticated>
    )
}
//
// <h5>
//     Submit Bugs
// </h5>
// <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#BugSubmission">
//     <img src={'Images/BugIcon.png'} alt={'Submit a Bug'}></img>
// </button>
