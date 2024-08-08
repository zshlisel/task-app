import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import './Login.css'

const userSchema = yup.object().shape({
    username: yup.string()
        .matches(/^[a-zA-Z0-9]+@[a-zA-z0-9]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/)
        .required('required'),
    password: yup.string()
        .min(8, 'min 8 chars')
        .required('required')
})



export default function SignUp() {
    const signUpRef = React.useRef();
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
            dob: '',
            email: '',
            phone: ''
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
            signUpRef.current.textContent = 'Signing Up...'

            let newUserObject = {
                name: 'exampleName',
                pass: values.password,
                email: values.username
            };

            const response = await fetch('http://localhost:3000/auth/user', {
                method: 'POST',
                mode: "cors",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserObject)
            });

            if (response.ok) {
                console.log('Successfully Signed Up');
                navigate("/tasks");
            } else {
                console.error('failed to add user');
                signUpRef.current.textContent = 'Sign Up'
            }

        }


    })

    

    console.log('signup called')

    const [disable, setDisable] = useState(true)

    useEffect(() => {
        if (Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length > 0) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [formik.errors, formik.touched]);




    return (<>
        <form className="login-form" onSubmit={formik.handleSubmit}>
            <section className={"login-form__username" + (formik.errors.username && formik.touched.username ? " invalid" : '')}>
                <label htmlFor="username">Username</label>
                <input value={formik.values.username} type="text" id="username" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </section>
            <p className="err-msg">{formik.touched.username ? formik.errors.username : ''}</p>

            <section className={"login-form__email" + (formik.errors.email && formik.touched.email ? " invalid" : '')}>
                <label htmlFor="email">Email</label>
                <input value={formik.values.email} type="text" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </section>
            <p className="err-msg">{formik.touched.email ? formik.errors.email : ''}</p>

            <section className={"login-form__password" + (formik.errors.password && formik.touched.password ? ' invalid' : '')}>
                <label htmlFor="password">Password</label>
                <input value={formik.values.password} type="password" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </section>
            <p className="err-msg">{formik.touched.password ? formik.errors.password : ''}</p>

            <section className="login-form__actions" >
                <button type="submit" disabled={disable} ref={signUpRef}>Sign Up</button>
                <a href="./">Login</a>
            </section>
        </form>
    </>
    )
}