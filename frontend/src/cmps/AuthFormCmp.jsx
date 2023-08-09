import React, { useEffect, useRef, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';
import Checkbox from '@mui/joy/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import bgcImg from '../assets/img/m1.png'


export function AuthFormCmp({ type, title, btnTxt, submitFunc, bottomLine, user }) {

    const dispatch = useDispatch()
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [credentials, setCredentials] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        bio: user?.bio || '',
        phone: user?.phone || '',
        address: user?.address || ''
    })
    const [isChangePass, setIsChangePass] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        password: false,
        newPassword: false
    })

    const error = useSelector(state => state.errorModule.error)
    const isLoading = useSelector(state => state.systemModule.isLoading)

    const passRef = useRef(null)
    const newPassRef = useRef(null)

    useEffect(() => {
        dispatch({ type: 'REMOVE_ERROR' })
    }, [dispatch])

    function togglePassVisibility(passName) {
        if (isPasswordVisible[passName]) {
            setIsPasswordVisible({ ...isPasswordVisible, [passName]: false })
        } else setIsPasswordVisible({ ...isPasswordVisible, [passName]: true })
    }
    useEffect(() => {
        console.log(passRef.current, newPassRef.current);
        if (!isChangePass) {
            const data = { ...credentials }
            delete data.password
            delete data.newPassword
            setCredentials(data)
            validate(data)

        }
    }, [isChangePass])

    // useEffect(() => {
    //     if (!isChangePass) {
    //         console.log(credentials);
    //         validate(credentials)
    //     }
    // }, [isChangePass])

    function handleChange({ target }) {
        const { name, value } = target
        setCredentials({ ...credentials, [name]: value })
    }

    useEffect(() => {
        console.log(credentials);
    }, [credentials])

    const onSubmit = () => {
        console.log('submitted!', credentials);
        dispatch({ type: 'REMOVE_ERROR' })
        setIsSubmiting(true)
        submitFunc(credentials)
    }


    // OPTIONAL TODO - remove formik, check only the active input and change only the relevant field in the state.


    function validate(values) {
        // console.log("MyForm ~ values", values)
        if (isSubmiting) {
            dispatch({ type: 'REMOVE_ERROR' })
            setIsSubmiting(false)
        }
        const errors = {};
        if (type === 'signup' || type === "profile-edit") {
            if (!values.firstName) {
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
            if (!values.password) {
                errors.password = 'Required'
            } else if (!/^.{8,20}$/.test(values.password)) {
                errors.password = 'Use at least 8 characters'
            }
            // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) 
            else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/.test(values.password)) {
                errors.password = 'Use at least 1 number, 1 capital letter and 1 lowercase letter'
                // errors.password = 'Use at least one number, one capital letter and one lower-case letter'
            }
        }
        if (type === 'profile-edit') {
            if (isChangePass) {
                if (!values.newPassword) {
                    errors.newPassword = 'Required'
                } else if (!/^.{8,20}$/.test(values.newPassword)) {
                    errors.newPassword = 'Use at least 8 characters'
                }
                // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) 
                else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/.test(values.newPassword)) {
                    errors.newPassword = 'Use at least 1 number, 1 capital letter and 1 lowercase letter'
                    // errors.newPassword = 'Use at least one number, one capital letter and one lower-case letter'
                }
            } else {
                console.log('deleting');
                delete values.password
                delete values.newPassword
                delete errors.password
                delete errors.newPassword

            }
        }
        if (values.phone && !/^05[2-9]\d{7}$/.test(values.phone)) {
            errors.phone = 'Please enter a valid israeli mobile phone number, use only digits'
        }

        setCredentials({ ...values, address: credentials.address })
        console.log(errors);
        return errors;
    }

    function onEnterPass(ev) {
        if (ev.code === 'Space') ev.preventDefault()
    }

    function onEnterPhone(ev) {
        const numericInput = ev.target.value.replace(/\D/g, "")
        if (ev.target.value !== numericInput) {
            ev.target.value = numericInput
        }
    }

    function toggleChangePass({ target }) {
        console.log(target.checked);
        if (target.checked) {
            setIsChangePass(true)
        } else {
            if (passRef.current) passRef.current.value = ''
            if (newPassRef.current) newPassRef.current.value = ''
            setIsChangePass(false)
            console.log('false', passRef, newPassRef);
        }
    }
    const { firstName, lastName, bio, phone, address, email, password, newPassword } = credentials
    return (
        <div className="form-container">
            {type !== 'profile-edit' && <img className="bgc-img" src={bgcImg} alt="" />}
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
                                <span className="count">{firstName.length} / 50</span>
                            </div>
                            <Field type="text" name="firstName" id="firstName" maxLength="50" />
                            <div className="error-con">
                                <ErrorMessage name="firstName" component="div" className="error" />
                            </div>
                            <div className="label-count flex space-between">
                                <label htmlFor="lastName">* Last Name</label>
                                <span className="count">{lastName.length} / 50</span>
                            </div>
                            {/* {type === 'profile-edit' && <label htmlFor="lastName">* Last Name</label>} */}
                            <Field type="text" name="lastName" id="lastName" maxLength="50" />
                            <div className="error-con">
                                <ErrorMessage name="lastName" component="div" className="error" />
                            </div>
                        </React.Fragment>
                    }
                    {type !== 'profile-edit' &&
                        <React.Fragment>
                            <div className="label-count flex space-between">
                                <label htmlFor="email">* Email</label>
                                <span className="count">{email?.length | 0} / 50</span>
                            </div>
                            <Field type="email" name="email" id="email" onKeyDown={onEnterPass} maxLength="50" />
                            <div className="error-con">
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                        </React.Fragment>}
                    {type === 'profile-edit' &&
                        <React.Fragment>
                            <div className="label-count flex space-between">
                                <label htmlFor="phone">Phone</label>
                                <span className="count">{phone.length} / 10</span>
                            </div>
                            <Field type="tel" name="phone" id="phone" placeholder="05XXXXXXXX" maxLength="10" onInput={onEnterPhone} />
                            <div className="error-con">
                                <ErrorMessage name="phone" component="div" className="error" />
                            </div>
                            <label htmlFor="address">Address</label>
                            <Autocomplete id="address" apiKey="AIzaSyDVtYUw2ARdt5BTtFCdWRFRNyrlFtGvYC8" name="address"
                                onPlaceSelected={(place) => {
                                    console.log(place);
                                    setCredentials({ ...credentials, address: place.formatted_address })
                                }} defaultValue={address}
                                style={{ 'marginBottom': 24 }}
                                options={{
                                    // types: ["(regions)"],
                                    types: ["address"],
                                    // componentRestrictions: { country: "ru" },
                                }}
                                language="en"
                                // defaultValue="Amsterdam"
                                placeholder=""
                            />
                            <div className="label-count flex space-between">
                                <label htmlFor="bio">Bio</label>
                                <span className="count bio">{bio.length} / 200</span>
                            </div>
                            <Field type="text" as="textarea" name="bio" id="bio" cols="30" rows="5" maxLength="200" />
                            {/* <textarea name="bio" id="bio" cols="30" rows="5" placeholder="Enter your bio"></textarea> */}
                        </React.Fragment>}
                    {type === 'profile-edit' && <Checkbox label="Change password?" size="md" variant="outlined" style={{ 'marginBottom': 24 }} onChange={toggleChangePass} />}
                    {type !== 'profile-edit' | isChangePass ?
                        <React.Fragment>
                            <div className="label-count flex space-between">
                                <label htmlFor="password">{type === 'profile-edit' ? '* Current password' : '* Password'}</label>
                                <div>
                                    <FontAwesomeIcon className="eye" icon={isPasswordVisible.password ? faEye : faEyeSlash} onClick={() => togglePassVisibility("password")} />
                                    <span className="count password">{password?.length | 0} / 20</span>
                                </div>
                            </div>
                            {/* {isChangePass && <label htmlFor="password">{type === 'profile-edit' ? '* Current password' : '* Password'}</label>} */}
                            {/* <span onClick={() => togglePassVisibility("password")}>toggle</span> */}
                            <Field type={isPasswordVisible.password ? "text" : "password"} name="password" id="password" minLength="8" maxLength="20" onKeyDown={onEnterPass} ref={passRef} />
                            <div className="error-con">
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>
                        </React.Fragment> : null}
                    {isChangePass && <React.Fragment>
                        <div className="label-count flex space-between">
                            <label htmlFor="newPassword">* New password</label>
                            <div>
                                <FontAwesomeIcon className="eye" icon={isPasswordVisible.newPassword ? faEye : faEyeSlash} onClick={() => togglePassVisibility("newPassword")} />
                                <span className="count password">{newPassword?.length | 0} / 20</span>
                            </div>
                        </div>
                        {/* <span onClick={() => togglePassVisibility("newPassword")}>toggle</span> */}
                        <Field type={isPasswordVisible.newPassword ? "text" : "password"} name="newPassword" id="newPassword" minLength="8" maxLength="20" onKeyDown={onEnterPass} ref={newPassRef} />
                        <div className="error-con">
                            <ErrorMessage name="newPassword" component="div" className="error" />
                        </div>
                    </React.Fragment>}
                    <div className="error-con">
                        {error && <div className="error">{error}</div>}
                    </div>
                    <button type="submit">{isLoading ? <Loader /> : btnTxt}</button>
                </Form>
            </Formik>
            <span className="bottom">{bottomLine}</span>


        </div>
    )
}
