import {useForm} from "@inertiajs/inertia-react";
import {useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {useContext} from "react";
import {UserContext} from "../Contexts/UserContext";
import {FormFloatingTextInput} from "../Components/FormFloatingTextInput";
import InputError from "../Components/InputError";
import {Offcanvas} from "react-bootstrap";

export function PersonalInfo(props) {
    const User = useContext(UserContext),
        { data, setData, patch, processing, errors, reset } = useForm({
        Name: User.name,
        Email: User.email,
    }), [editingProfile,setEditingProfile] = useState(false),
        [submitting, setSubmitting] = useState(false)
        ,[buttonValue, setButtonValue] = useState('Edit');

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        console.log(event.target.value);
    };
    let name,email;
    useEffect(()=>{
        name = data.Name;
        email = data.Email;
    },[editingProfile]);

    function editProfile() {
      setEditingProfile(!editingProfile);
      if(!editingProfile) {
          setButtonValue('Save');
      }
      else {
          setButtonValue('Edit');
          if(data.Name !== name || data.Email !== email)
            Inertia.patch(route('User.Update'),data);
      }
    }

    const submit = (e) => {
        e.preventDefault();
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className="btn btn-outline-primary text-center ms-0 ms-xl-5" type="button" onClick={handleShow}>
                My Profile
            </button>
            <Offcanvas show={show} onHide={handleClose} backdrop="static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <h3 className="offcanvas-title" id="PersonalInfo">My Profile</h3>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='card border-0 p-2 shadow my-3'>
                        <div className='card-title p-2 text-center'><h2>Personal Information</h2></div>
                        <div className='card-body'>
                            <form onSubmit={submit}>
                                <div className="row justify-content-center">
                                    <FormFloatingTextInput
                                        type='text'
                                        name='Name'
                                        value={data.Name}
                                        required={false}
                                        handleChange={onHandleChange}
                                        placeHolder='Full Name'
                                        disabled={!editingProfile}
                                        className={'my-2'}
                                    ></FormFloatingTextInput>
                                    <InputError message={errors.Name} className="mt-2" />
                                    <FormFloatingTextInput
                                        type='email'
                                        name='Email'
                                        value={data.Email}
                                        required={false}
                                        handleChange={onHandleChange}
                                        placeHolder='Email'
                                        disabled={!editingProfile}
                                        className={'my-2'}
                                    ></FormFloatingTextInput>
                                    <InputError message={errors.Email} className="mt-2" />
                                    {/*<FormFloatingTextInput*/}
                                    {/*    type='text'*/}
                                    {/*    name='Phone_Number'*/}
                                    {/*    value={data.Phone_Number}*/}
                                    {/*    required={false}*/}
                                    {/*    handleChange={onHandleChange}*/}
                                    {/*    placeHolder='Phone Number'*/}
                                    {/*    disabled={!editingProfile}*/}
                                    {/*></FormFloatingTextInput>*/}
                                    {/*<InputError message={errors.Phone_Number} className="mt-2" />*/}
                                    <button className='btn btn-primary btn-sm' onClick={editProfile}>{buttonValue}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
