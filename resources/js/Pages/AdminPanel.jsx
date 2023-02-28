import Authenticated from "../Layouts/AuthenticatedLayout";
import {Users} from "../AdminPanelComponents/Users";
import {Reviews} from "../AdminPanelComponents/Reviews";
import {useEffect} from "react";
import {Bugs} from "../AdminPanelComponents/Bugs";

export default function AdminPanel(props) {
    useEffect(()=>  {
        document.title = 'Admin Panel';
    });
    const UsersList = props.Users,
        ReviewsList = props.Reviews,
        BugsList = props.Bugs;
    console.log(props);

    return (
        <Authenticated>
            <div className={'container-fluid p-3'}>
                <div className={'row h-50'}>
                    <div className={'col-12 col-lg-5'}>
                        <Bugs Bugs={BugsList}>

                        </Bugs>
                    </div>
                    <div className={'col-12 col-md-5 col-lg-2 h-100'}>
                        <Users Users={UsersList}>

                        </Users>
                    </div>
                    <div className={'col-12 col-md-7 col-lg-5'}>
                        <Reviews Reviews={ReviewsList}>

                        </Reviews>
                    </div>
                </div>
                {/*<div className={'row mt-4'}>*/}

                {/*</div>*/}
            </div>
        </Authenticated>
    )
}
