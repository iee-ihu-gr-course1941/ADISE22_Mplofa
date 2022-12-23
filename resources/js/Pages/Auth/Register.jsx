import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import TextInput from "@/Components/TextInput";
import {FormFloatingTextInput} from "../../Components/FormFloatingTextInput";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
            <div className="form-container sign-up-container">
                <form onSubmit={submit}>
                    <h1 className='my-3'>Create Account</h1>
                    {/*<div className="social-container">*/}
                    {/*    <a href="resources/js/Pages/Auth/Register#" className="social"><i className="fab fa-facebook-f"></i></a>*/}
                    {/*    <a href="resources/js/Pages/Auth/Register#" className="social"><i className="fab fa-google-plus-g"></i></a>*/}
                    {/*    <a href="resources/js/Pages/Auth/Register#" className="social"><i className="fab fa-linkedin-in"></i></a>*/}
                    {/*</div>*/}
                    {/*<span>or use your email for registration</span>*/}
                    {/*<input type="text" placeholder="Name"/>*/}
                    <FormFloatingTextInput
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={'Name'}
                        className={''}
                    />
                    {errors.name}
                    <FormFloatingTextInput
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={'Email'}
                    />
                    {errors.email}
                    <FormFloatingTextInput
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={'Password'}
                    />
                    {errors.password}
                    <FormFloatingTextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={'Confirm Password'}
                    />
                    {errors.password_confirmation}
                    <button className='btn btn-outline-success border-3'>Sign Up</button>
                </form>
            </div>
    );
}
