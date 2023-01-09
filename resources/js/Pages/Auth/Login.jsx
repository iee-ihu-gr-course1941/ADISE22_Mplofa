import React, {useEffect, useState} from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputError from "@/Components/InputError";
import {FormFloatingTextInput} from "../../Components/FormFloatingTextInput";

export default function Login({ status, canResetPassword}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'geontsou52@gmail.com',
        password: 'Test@laravel2022',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        console.log(event.target.name,event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={submit} className=' p-4'>
                <h1  className='my-3'>Sign in</h1>
                    <FormFloatingTextInput
                        type="email"
                        name="email"
                        value={data.email}
                        handleChange={onHandleChange}
                        isFocused={true}
                        required={true}
                        placeHolder={"Email"}/>
                    <FormFloatingTextInput
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                        required={true}
                        placeHolder={"Password"}
                    />
                <div>
                    <InputError message={errors.email} className="mt-2" />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <a className={'link-info text-decoration-none my-2'} href={route('password.request')}>Forgot your password?</a>
                <button className='btn btn-outline-success border-3'>Sign In</button>
            </form>
        </div>
    );
}
