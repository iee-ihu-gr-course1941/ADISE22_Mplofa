import Authenticated from "../Layouts/AuthenticatedLayout";
import {Users} from "../AdminPanelComponents/Users";
import {Reviews} from "../AdminPanelComponents/Reviews";
import {useEffect} from "react";

export default function AdminPanel(props) {
    useEffect(()=>  {
        document.title = 'Admin Panel';
    });
    console.log(props)
    return (
        <Authenticated>
            <div className={'container-fluid p-3'}>
                <div className={'row h-50'}>
                    <div className={'col-12 col-md-5 col-lg-3 h-100'}>
                        <Users Users={props.Users}>

                        </Users>
                    </div>
                    <div className={'col-12 col-md-7 col-lg-6 overflow-auto h-100'}>
                        <Reviews Reviews={props.Reviews}>

                        </Reviews>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
