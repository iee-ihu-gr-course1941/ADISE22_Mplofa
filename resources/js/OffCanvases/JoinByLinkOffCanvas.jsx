import {useContext, useEffect, useState} from "react";
import {ErrorContext} from "../Contexts/ErrorContext";
import {Inertia} from "@inertiajs/inertia";
import {FormFloatingTextInput} from "../Components/FormFloatingTextInput";
import {Link} from "@inertiajs/inertia-react";
import {Offcanvas} from "react-bootstrap";
import InputError from "../Components/InputError";

export function JoinByLinkOffCanvas() {
    const [show, setShow] = useState(false),
        handleClose = () => setShow(false),
        handleShow = () => setShow(true),
        [link,setLink] = useState(''),
        // [linkError,setLinkError] = useState(''),
        regex = /^\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/gi,
        errors = useContext(ErrorContext),
        onsubmit=(e)=>{
            if(link !== '') {
                e.preventDefault();
                Inertia.post((route('Join_Room_By_Link')+link),{Password:link,RoomId:Room.id})
            }
        };
    return (
        <>
            <button className="btn btn-outline-primary w-auto text-center mx-1" type="button" onClick={handleShow}>
                Join Room By Link
            </button>
            <Offcanvas show={show} onHide={handleClose} backdrop="static" placement={'end'} className={'text-center'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <h3 className="offcanvas-title" id="offcanvasExampleLabel">Join a Room by Link</h3>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                        <div className={'text-center'}>
                            <form className={'d-block'} onSubmit={(e)=>{onsubmit(e)}}>
                                <FormFloatingTextInput
                                    type='text'
                                    name='Link'
                                    value={link}
                                    required={true}
                                    handleChange={(e) => {setLink(e.target.value);}}
                                    placeHolder={"Enter Room Link"}
                                    className={'my-3'}
                                ></FormFloatingTextInput>
                                {errors.RoomLinkError && <strong><InputError message={errors.RoomLinkError} className="mt-2 text-danger"/></strong>}
                                {/*{linkError !== '' && <strong><InputError message={linkError} className="my-1 text-danger"/></strong>}*/}
                            </form>
                        </div>
                        {/*<div className={'text-center'}>*/}
                            <Link href={(route('Join_Room_By_Link')+link)} method={'post'}
                                  as={'button'} className="btn btn-success text-center mt-2 w-50 mx-auto" type="button"
                                  disabled={(link.length === 0) || !regex.test(link)}

                                   preserveScroll={true}>
                                Join
                            </Link>
                        {/*</div>*/}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
