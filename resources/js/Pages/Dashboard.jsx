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
import {ErrorContext} from "../Contexts/ErrorContext";

export default function Dashboard(props) {
    const [roomDoesntExistErrorVisible,setRoomDoesntExistErrorVisible] = useState(!!props.errors.Room_Doesnt_Exist),
    [RoomsList,setRooms] = useState(props.Rooms.Rooms);

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
        <ErrorContext.Provider value={props.errors}>
            <UserContext.Provider value={props.auth.user}>
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
                                    <h6 className={'text-danger'}>&#9888; If this is your first time playing on a new device or a new browser, please refresh the page once.</h6>
                                    <h6 className={'text-danger'}>There is a known bug that causes some buttons to sometimes not render properly, I am still working on a fix. &#9888;</h6>
                                    <h6 className={'text-success'}>Thank you for your understanding!</h6>
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
                                            <Rooms rooms={RoomsList}>
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
                        <div className={'row align-self-end text-center'}>
                            <div className={'col'}>
                                <div className={'col-12 mt-5'}>
                                    <BugSubmissionForm>

                                    </BugSubmissionForm>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BeforeYouPlay>

                    </BeforeYouPlay>
                </Authenticated>
            </UserContext.Provider>
        </ErrorContext.Provider>
    )
}
