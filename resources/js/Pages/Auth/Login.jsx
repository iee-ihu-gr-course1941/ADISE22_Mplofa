import React, {useEffect, useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

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
            <form onSubmit={submit}>
                <h1>Sign in</h1>
                <div className="social-container">
                    <button className="social"><i className="fab fa-facebook-f"></i></button>
                    <button type='button' className="social"><i className="fab fa-google-plus-g"></i></button>
                    <a href="resources/js/Pages/Auth/Login#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        handleChange={onHandleChange}
                        isFocused={true}
                        required={true}
                        placeHolder={"Email"}/>
                    <TextInput
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
                <a href={route('password.request')}>Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
}
