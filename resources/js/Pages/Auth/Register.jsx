import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
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
            <div className="form-container sign-up-container overflow-scroll">
                <form onSubmit={submit}>
                    <h1 className='mt-5'>Create Account</h1>
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
                    <FormFloatingTextInput
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={'Email'}
                    />
                    <FormFloatingTextInput
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={'Password'}
                    />
                    <FormFloatingTextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={'Confirm Password'}
                    />
                    {errors.name && <p className={'text-danger'}>{errors.name}</p>}
                    {errors.email && <p className={'text-danger'}>{errors.email}</p>}
                    {errors.password && <p className={'text-danger'}>{errors.password}</p>}
                    {errors.password_confirmation && <p className={'text-danger'}>{errors.password_confirmation}</p>}
                    <button className='btn btn-outline-success border-3'>Sign Up</button>
                    {/*<div className={'align-self-bottom p-2 mt-1'}>*/}
                    {/*    <p className={'text-success'}>Your passwords are hashed before being stored in the database.</p>*/}
                    {/*</div>*/}
                </form>
            </div>
    );
}
