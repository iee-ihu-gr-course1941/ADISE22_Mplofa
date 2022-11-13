import {Head} from "@inertiajs/inertia-react";
import Authenticated from "../Layouts/AuthenticatedLayout";

export default function Dashboard(props) {
    return (
        <Authenticated>
            <Head title="Dashboard" ><title>Dashboard</title></Head>
                <div className='container p-3'>

                </div>
        </Authenticated>
    )
}
