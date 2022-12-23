import {Head} from "@inertiajs/inertia-react";
import Authenticated from "../Layouts/AuthenticatedLayout";
import {PersonalInfo} from "../Profile/PersonalInfo";
import {Friends} from "../Profile/Friends";

export default function Dashboard(props) {
    return (
        <Authenticated>
            <Head title="Dashboard" ><title>Dashboard</title></Head>
                <div className='container p-3'>
                    <div className={'row'}>
                        <div className={'col-6'}>
                            <PersonalInfo User={props.auth.user}>

                            </PersonalInfo>
                        </div>
                        <div className={'col-6'}>
                            <Friends>

                            </Friends>
                        </div>
                    </div>
                </div>
        </Authenticated>
    )
}
