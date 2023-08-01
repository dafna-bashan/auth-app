import React, { useEffect, useState } from 'react'
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



    // const handleChange = ({ target }) => {
    //     const { name, value } = target
    //     console.log(name, value);
    //     setCredentials({ ...credentials, [name]: value })
    //     // console.log(name, value, user)
    // }

    const error = useSelector(state => state.errorModule.error)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    // const inputRef = useRef(null)

    useEffect(() => {
        dispatch({ type: 'REMOVE_ERROR' })
    }, [dispatch])

    useEffect(() => {
        if (!isChangePass) {
            const data = { ...credentials }
            delete data.password
            delete data.newPassword
            setCredentials(data)
        }
        // eslint-disable-next-line
    }, [isChangePass])

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
                errors.password = 'Use at least 1 number, 1 capital letter and 1 lowercase letter'
                // errors.password = 'Use at least one number, one capital letter and one lower-case letter'
            }
        }
        if (type === 'profile-edit' && isChangePass) {
            if (!/^.{8,20}$/.test(values.newPassword)) {
                errors.newPassword = 'Use at least 8 characters'
            }
            // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) 
            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/.test(values.newPassword)) {
                errors.newPassword = 'Use at least 1 number, 1 capital letter and 1 lowercase letter'
                // errors.newPassword = 'Use at least one number, one capital letter and one lower-case letter'
            }
        }

        if (values.phone && !/^05[2-9]\d{7}$/.test(values.phone)) {
            errors.phone = 'Please enter a valid israeli mobile phone number, use only digits'
        }

        setCredentials(values)
        console.log(errors);
        return errors;
    }

    function onEnterPass(ev) {
        // console.log(ev.target.value.length, ev.code);
        if (ev.code === 'Space') ev.preventDefault()
        // if (ev.target.value.length >= 20 && ev.code !== 'Backspace') ev.preventDefault()
    }

    function onEnterPhone(ev) {
        const numericInput = ev.target.value.replace(/\D/g, "")
        if (ev.target.value !== numericInput) {
            ev.target.value = numericInput
        }
        // console.log(parseInt(ev.target.value));
        // const isNum = +ev.target.value
        // if (!/^\d+$/.test(+ev.target.value) && ev.code !== 'Backspace') ev.preventDefault()
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
            {type !== 'profile-edit' && <div className="main-title">Auth app</div>}
            <div className="title">{title}</div>
            <Formik
                initialValues={credentials}
                validate={validate}
                onSubmit={onSubmit}>
                <Form className="flex column">
                    {type !== 'login' &&
                        <React.Fragment>
                            <div className="label-count flex space-between">
                                <label htmlFor="firstName">* First Name</label>
                                {/* {type === 'profile-edit' && <label htmlFor="firstName">* First Name</label>} */}
                                <span className="count">{credentials.firstName.length} / 50</span>
                            </div>
                            <Field type="text" name="firstName" maxLength="50" />
                            <div className="error-con">
                                <ErrorMessage name="firstName" component="div" className="error" />
                            </div>
                            <div className="label-count flex space-between">
                                <label htmlFor="lastName">* Last Name</label>
                                <span className="count">{credentials.lastName.length} / 50</span>
                            </div>
                            {/* {type === 'profile-edit' && <label htmlFor="lastName">* Last Name</label>} */}
                            <Field type="text" name="lastName" maxLength="50" />
                            <div className="error-con">
                                <ErrorMessage name="lastName" component="div" className="error" />
                            </div>
                        </React.Fragment>
                    }
                    {type !== 'profile-edit' &&
                        <React.Fragment>
                            <div className="label-count flex space-between">
                                <label htmlFor="email">* Email</label>
                                <span className="count">{credentials.email?.length | 0} / 50</span>
                            </div>
                            <Field type="email" name="email" onKeyDown={onEnterPass} maxLength="50" />
                            <div className="error-con">
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                        </React.Fragment>}
                    {type === 'profile-edit' &&
                        <React.Fragment>
                            <div className="label-count flex space-between">
                                <label htmlFor="phone">Phone</label>
                                <span className="count">{credentials.phone.length} / 10</span>
                            </div>
                            <Field type="tel" name="phone" placeholder="05XXXXXXXX" maxLength="10" onInput={onEnterPhone} />
                            <div className="error-con">
                                <ErrorMessage name="phone" component="div" className="error" />
                            </div>
                            <div className="label-count flex space-between">
                                <label htmlFor="bio">Bio</label>
                                <span className="count bio">{credentials.bio.length} / 200</span>
                            </div>
                            <Field type="text" as="textarea" name="bio" cols="30" rows="5" maxLength="200" />
                            {/* <textarea name="bio" id="bio" cols="30" rows="5" placeholder="Enter your bio"></textarea> */}
                        </React.Fragment>}
                    {type === 'profile-edit' && <Checkbox label="Change password?" size="md" variant="outlined" style={{ 'marginBottom': 24 }} onChange={toggleChangePass} />}
                    {type !== 'profile-edit' | isChangePass ?
                        <React.Fragment>
                            <div className="label-count flex space-between">
                                <label htmlFor="password">{type === 'profile-edit' ? '* Current password' : '* Password'}</label>
                                <span className="count">{credentials.password?.length | 0} / 20</span>
                            </div>
                            {/* {isChangePass && <label htmlFor="password">{type === 'profile-edit' ? '* Current password' : '* Password'}</label>} */}
                            <Field type="password" name="password" minLength="8" maxLength="20" onKeyDown={onEnterPass} />
                            <div className="error-con">
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>
                        </React.Fragment> : null}
                    {isChangePass && <React.Fragment>
                        <div className="label-count flex space-between">
                            <label htmlFor="newPassword">* New password</label>
                            <span className="count">{credentials.newPassword?.length | 0} / 20</span>
                        </div>
                        <Field type="password" name="newPassword" minLength="8" maxLength="20" onKeyDown={onEnterPass} />
                        <div className="error-con">
                            <ErrorMessage name="newPassword" component="div" className="error" />
                        </div>
                    </React.Fragment>}
                    {error && <div className="error">{error}</div>}
                    <button type="submit">{isLoading ? <Loader /> : btnTxt}</button>
                </Form>
            </Formik>
            <span className="bottom">{bottomLine}</span>


        </div>
    )
}
