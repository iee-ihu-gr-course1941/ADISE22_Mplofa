import {useForm} from "@inertiajs/inertia-react";
import {useState} from "react";
import {FormFloatingTextInput} from "@/Components/FormFloatingTextInput";
import InputError from "@/Components/InputError";

export function PersonalInfo(props) {
    const User = props.User,
        { data, setData, patch, processing, errors, reset } = useForm({
        Name: User.name,
        Email: User.email,
        Phone_Number: User.phone,
    }), [editingProfile,setEditingProfile] = useState(false),
        [submitting, setSubmitting] = useState(false)
        ,[buttonValue, setButtonValue] = useState('Edit');

    // console.log(User);
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        console.log(event.target.value);
    };

    function editProfile() {
      setEditingProfile(!editingProfile);
      if(!editingProfile){
          setButtonValue('Save');
      }
      else {
          setButtonValue('Edit');
          patch(route('User.Update'));
      }
    }

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='card border-0 p-2 shadow'>
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
                            ></FormFloatingTextInput>
                        <InputError message={errors.Email} className="mt-2" />
                            <FormFloatingTextInput
                                type='text'
                                name='Phone_Number'
                                value={data.Phone_Number}
                                required={false}
                                handleChange={onHandleChange}
                                placeHolder='Phone Number'
                                disabled={!editingProfile}
                            ></FormFloatingTextInput>
                        <InputError message={errors.Phone_Number} className="mt-2" />
                            <button className='btn btn-primary btn-sm' onClick={editProfile}>{buttonValue}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
