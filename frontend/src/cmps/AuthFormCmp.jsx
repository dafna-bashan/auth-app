import React, { useEffect, useRef, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';
import Checkbox from '@mui/joy/Checkbox';

export function AuthFormCmp({ type, title, btnTxt, submitFunc, bottomLine, user }) {

    const dispatch = useDispatch()
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [credentials, setCredentials] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        bio: user?.bio || '',
        phone: user?.phone || ''
    })
    const [isChangePass, setIsChangePass] = useState(false)



    const handleChange = ({ target }) => {
        const { name, value } = target
        console.log(name, value);
        setCredentials({ ...credentials, [name]: value })
        // console.log(name, value, user)
    }

    const error = useSelector(state => state.errorModule.error)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    // const inputRef = useRef(null)

    useEffect(() => {
        dispatch({ type: 'REMOVE_ERROR' })
    }, [dispatch])

    const onSubmit = () => {
        console.log('submitted!', credentials);
        dispatch({ type: 'REMOVE_ERROR' })
        setIsSubmiting(true)
        submitFunc(credentials)
    }


    // OPTIONAL TODO - remove formik, check only the active input and change only the relevant field in the state.


    const validate = (values) => {
        // console.log("MyForm ~ values", values)
        if (isSubmiting) {
            dispatch({ type: 'REMOVE_ERROR' })
            setIsSubmiting(false)
        }
        const errors = {};
        if (type === 'signup' || type === "profile-edit") {
            if (!values.firstName) {
                // if(document.activeElement === inputRef.current) 
                errors.firstName = 'Required';
            }
            if (!values.lastName) {
                errors.lastName = 'Required';
            }
        }
        if (type !== 'profile-edit') {
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
        }
        if (type !== 'profile-edit' || isChangePass) {
            if (!/^.{8,20}$/.test(values.password)) {
                errors.password = 'Use at least 8 characters'
            }
            // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) 
            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/.test(values.password)) {
                errors.password = 'Use at least one number, one capital letter and one lower-case letter'
            }
        }
        if (type === 'profile-edit' && isChangePass) {
            if (!/^.{8,20}$/.test(values.newPassword)) {
                errors.newPassword = 'Use at least 8 characters'
            }
            // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) 
            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/.test(values.newPassword)) {
                errors.newPassword = 'Use at least one number, one capital letter and one lower-case letter'
            }
        }
        setCredentials(values)
        // console.log(errors);
        return errors;
    }

    function onEnterPass(ev) {
        console.log(ev.target.value.length);
        if (ev.code === 'Space') ev.preventDefault()
        if (ev.target.value.length >= 21) ev.preventDefault()
    }

    function toggleChangePass({ target }) {
        // console.log(target.checked);
        if (target.checked) {
            setIsChangePass(true)
        } else {
            setIsChangePass(false)
        }
    }

    return (
        <div className="form-container">
            <div className="title">{title}</div>
            <Formik
                initialValues={credentials}
                validate={validate}
                onSubmit={onSubmit}>
                <Form className="flex column">
                    {type !== 'login' &&
                        <React.Fragment>
                            {type === 'profile-edit' && <label htmlFor="firstName">First Name</label>}
                            <Field name="firstName" placeholder="First name" />
                            <div className="error-con">
                                <ErrorMessage name="firstName" component="div" className="error" />
                            </div>
                            {type === 'profile-edit' && <label htmlFor="lastName">Last Name</label>}
                            <Field name="lastName" placeholder="Last name" />
                            <div className="error-con">
                                <ErrorMessage name="lastName" component="div" className="error" />
                            </div>
                        </React.Fragment>
                    }
                    {type !== 'profile-edit' &&
                        <React.Fragment>
                            <Field type="email" name="email" placeholder="Email" onKeyDown={onEnterPass} />
                            <div className="error-con">
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                        </React.Fragment>}
                    {type === 'profile-edit' &&
                        <React.Fragment>
                            <label htmlFor="phone">Phone</label>
                            <Field type="phone" name="phone" placeholder="Enter your mobile phone number" onKeyDown={onEnterPass} />
                            <div className="error-con">
                                <ErrorMessage name="mobile" component="div" className="error" />
                            </div>
                            <label htmlFor="bio">Bio</label>
                            <textarea name="bio" id="bio" cols="30" rows="5" placeholder="Enter your bio"></textarea>
                        </React.Fragment>}
                    {type === 'profile-edit' && <Checkbox label="Change password?" size="md" variant="outlined" style={{ 'marginBottom': 24 }} onChange={toggleChangePass} />}
                    {type !== 'profile-edit' | isChangePass ?
                        <React.Fragment>
                            {isChangePass && <label htmlFor="password">{type === 'profile-edit' ? 'Current password' : 'Password'}</label>}
                            <Field type="password" name="password" placeholder={type === 'profile-edit' ? "Enter your current password" : "Password"} minLength="8" maxLength="20" onKeyDown={onEnterPass} />
                            <div className="error-con">
                                <ErrorMessage name="password" component="div" className="error" />
                                {/* {error && <ErrorModal error={error} />} */}
                                {/* {error && <div className="error">{error}</div>} */}
                            </div>
                        </React.Fragment> : null}
                    {isChangePass && <React.Fragment>
                        <label htmlFor="newPassword">New password</label>
                        <Field type="password" name="newPassword" placeholder={type === 'profile-edit' ? "Enter your new password" : "Password"} minLength="8" maxLength="20" onKeyDown={onEnterPass} />
                        <div className="error-con">
                            <ErrorMessage name="newPassword" component="div" className="error" />
                            {/* {error && <ErrorModal error={error} />} */}
                        </div>
                    </React.Fragment>}
                    {error && <div className="error">{error}</div>}
                    <button type="submit">{isLoading ? <Loader /> : btnTxt}</button>
                </Form>
            </Formik>
            <span>{bottomLine}</span>


        </div>
    )
}
