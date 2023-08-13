import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';
import Checkbox from '@mui/joy/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Autocomplete from "react-google-autocomplete";
import bgcImg from '../assets/img/m1.png'

export function FormAuth({ type, title, btnTxt, submitFunc, bottomLine, user }) {

    const dispatch = useDispatch()
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [credentials, setCredentials] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        bio: user?.bio || '',
        phone: user?.phone || '',
        address: user?.address || ''
    })
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        newPassword: ''
    })

    const [isFormValid, setIsFormValid] = useState(false)
    const [isChangePass, setIsChangePass] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        password: false,
        newPassword: false
    })

    const submitError = useSelector(state => state.errorModule.error)
    const isLoading = useSelector(state => state.systemModule.isLoading)

    useEffect(() => {
        dispatch({ type: 'REMOVE_ERROR' })
    }, [dispatch])


    function togglePassVisibility(passName) {
        setIsPasswordVisible(prevState => ({
            ...prevState,
            [passName]: !prevState[passName],
        }));
    }

    function toggleChangePass({ target }) {
        if (target.checked) {
            setIsChangePass(true);
        } else {
            setIsChangePass(false);
        }
    }

    useEffect(() => {
        if (isChangePass) {
            setIsFormValid(false)
        } else {
            const data = credentials
            delete data.password
            delete data.newPassword
            setCredentials(data)
            setErrors(prevErrors => ({
                ...prevErrors,
                password: '',
                newPassword: '',
            }));
            dispatch({ type: 'REMOVE_ERROR' })
            setIsPasswordVisible({ password: false, newPassword: false })
            isButtonDisabled()
        }
    }, [isChangePass])

    function handleChange({ target }) {
        const { name, value } = target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value,
        }));
        validate(target)
    }

    useEffect(() => {
        console.log(credentials);
        isButtonDisabled()
        // validate(credentials)
    }, [errors.firstName, errors.lastName, errors.email, errors.phone, errors.password, errors.newPassword])

    // useEffect(() => {
    //     console.log(isFormValid);
    // }, [isFormValid])

    const onSubmit = (ev) => {
        ev.preventDefault()
        console.log('submitted!', credentials);
        dispatch({ type: 'REMOVE_ERROR' })
        setIsSubmiting(true)
        submitFunc(credentials)
    }


    function validate(values) {
        // console.log("MyForm ~ values", values)
        if (isSubmiting) {
            dispatch({ type: 'REMOVE_ERROR' })
            setIsSubmiting(false)
        }
        switch (values.name) {
            case 'firstName':
                if (type !== 'login') {
                    if (!values.value) {
                        setErrors(prevErrors => ({ ...prevErrors, firstName: 'Required' }))
                    } else {
                        setErrors(prevErrors => ({ ...prevErrors, firstName: '' }))
                    }
                }
                break;
            case 'lastName':
                if (type !== 'login') {
                    if (!values.value) {
                        setErrors(prevErrors => ({ ...prevErrors, lastName: 'Required' }))
                    } else {
                        setErrors(prevErrors => ({ ...prevErrors, lastName: '' }))
                    }
                }
                break;
            case 'email':
                if (type !== 'profile-edit') {
                    if (!values.value) {
                        setErrors(prevErrors => ({ ...prevErrors, email: 'Required' }))
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.value)) {
                        setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email address' }))
                    } else {
                        setErrors(prevErrors => ({ ...prevErrors, email: '' }))
                    }
                }
                break;
            case 'password':
                if (type !== 'profile-edit' || isChangePass) {
                    if (!values.value) {
                        setErrors(prevErrors => ({ ...prevErrors, password: 'Required' }))
                    } else if (!/^.{8,20}$/.test(values.value)) {
                        setErrors(prevErrors => ({ ...prevErrors, password: 'Use at least 8 characters' }))
                    }
                    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/.test(values.value)) {
                        setErrors(prevErrors => ({ ...prevErrors, password: 'Use at least 1 number, 1 capital letter and 1 lowercase letter' }))
                    } else {
                        setErrors(prevErrors => ({ ...prevErrors, password: '' }))
                    }
                }
                break;
            case 'newPassword':
                if (type === 'profile-edit') {
                    if (isChangePass) {
                        if (!values.value) {
                            setErrors(prevErrors => ({ ...prevErrors, newPassword: 'Required' }))
                        } else if (!/^.{8,20}$/.test(values.value)) {
                            setErrors(prevErrors => ({ ...prevErrors, newPassword: 'Use at least 8 characters' }))
                        }
                        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/.test(values.value)) {
                            setErrors(prevErrors => ({ ...prevErrors, newPassword: 'Use at least 1 number, 1 capital letter and 1 lowercase letter' }))
                        } else {
                            setErrors(prevErrors => ({ ...prevErrors, newPassword: '' }))
                        }
                    }
                }
                break;
            case 'phone':
                if (values.value && !/^05[0-9]\d{7}$/.test(values.value)) {
                    setErrors(prevErrors => ({ ...prevErrors, phone: 'Please enter a valid israeli mobile phone number, use only digits' }))
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, phone: '' }))
                }
            default:
                break;
        }
        // isButtonDisabled()
        // console.log(errors);
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

    function isButtonDisabled() {
        if (errors.firstName || errors.lastName || errors.email || errors.phone || errors.password || errors.newPassword
            || (type === 'login' || type === 'signup') && (!credentials.email || !credentials.password) ||
            ((type === 'signup' || type === 'profile-edit') && (!credentials.firstName || !credentials.lastName)) ||
            (isChangePass && (!credentials.password || !credentials.newPassword))) {
            // console.log('isvalid', false);
            setIsFormValid(false)
        } else {
            // console.log('isvalid', true);
            setIsFormValid(true)
        }
    }

    function onPressEnter(ev) {
        if (type === 'profile-edit' && (ev.charCode || ev.keyCode) === 13) {
            ev.preventDefault();
        }
    }

    const { firstName, lastName, bio, phone, address, email, password, newPassword } = credentials
    return (
        <div className="form-container">
            {type !== 'profile-edit' && <img className="bgc-img" src={bgcImg} alt="" />}
            {type !== 'profile-edit' && <div className="main-title">Auth app</div>}
            <div className="title">{title}</div>

            <form className="flex column" onSubmit={onSubmit} onKeyDown={onPressEnter}>
                {type !== 'login' &&
                    <React.Fragment>
                        <div className="label-count flex space-between">
                            <label htmlFor="firstName">* First Name</label>
                            <span className="count">{firstName.length} / 50</span>
                        </div>
                        <input type="text" name="firstName" id="firstName" maxLength="50" value={firstName} onChange={handleChange} onBlur={(ev) => validate(ev.target)} />
                        <div className="error-con">
                            {errors.firstName}
                        </div>
                        <div className="label-count flex space-between">
                            <label htmlFor="lastName">* Last Name</label>
                            <span className="count">{lastName.length} / 50</span>
                        </div>
                        <input type="text" name="lastName" id="lastName" maxLength="50" value={lastName} onChange={handleChange} onBlur={(ev) => validate(ev.target)} />
                        <div className="error-con">
                            {errors.lastName}
                        </div>
                    </React.Fragment>
                }
                {type !== 'profile-edit' &&
                    <React.Fragment>
                        <div className="label-count flex space-between">
                            <label htmlFor="email">* Email</label>
                            <span className="count">{email?.length | 0} / 50</span>
                        </div>
                        <input type="email" name="email" id="email" onKeyDown={onEnterPass} maxLength="50" onChange={handleChange} onBlur={(ev) => validate(ev.target)} />
                        <div className="error-con">
                            {errors.email}
                        </div>
                    </React.Fragment>}
                {type === 'profile-edit' &&
                    <React.Fragment>
                        <div className="label-count flex space-between">
                            <label htmlFor="phone">Phone</label>
                            <span className="count">{phone.length} / 10</span>
                        </div>
                        <input type="tel" name="phone" id="phone" placeholder="05XXXXXXXX" maxLength="10" value={phone} onInput={onEnterPhone} onChange={handleChange} />
                        <div className="error-con">
                            {errors.phone}
                        </div>
                        <div className="label-count flex space-between">
                            <label htmlFor="address">Address</label>
                            <FontAwesomeIcon className="remove" icon={faCircleXmark} style={{ color: "#4F4F4F" }}
                                onClick={() => {
                                    console.log('clicked');
                                    setCredentials(prevCredentials => ({ ...prevCredentials, address: '' }))
                                }} />
                        </div>
                        <Autocomplete id="address" apiKey="AIzaSyDVtYUw2ARdt5BTtFCdWRFRNyrlFtGvYC8" name="address"
                            onPlaceSelected={(place) => {
                                // console.log(place);
                                setCredentials(prevCredentials => ({ ...prevCredentials, address: place.formatted_address }))
                            }}
                            // defaultValue={address}
                            value={address}
                            onChange={handleChange}
                            style={{ 'marginBottom': 24 }}
                            options={{
                                types: [],
                                // types: ["address", "(cities)", "(regions)"],
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
                        <textarea name="bio" id="bio" cols="30" rows="5" maxLength="200" value={bio} onChange={handleChange} />
                    </React.Fragment>}
                {type === 'profile-edit' && <Checkbox className="checkbox" label="Change password?" size="md" variant="outlined" style={{ 'marginBottom': 24 }} onChange={toggleChangePass} />}
                {type !== 'profile-edit' | isChangePass ?
                    <React.Fragment>
                        <div className="label-count flex space-between">
                            <label htmlFor="password">{type === 'profile-edit' ? '* Current password' : '* Password'}</label>
                            <div>
                                <FontAwesomeIcon className="eye" icon={isPasswordVisible.password ? faEye : faEyeSlash} style={{ color: "#4F4F4F" }} onClick={() => togglePassVisibility("password")} />
                                <span className="count password">{password?.length | 0} / 20</span>
                            </div>
                        </div>
                        <input type={isPasswordVisible.password ? "text" : "password"} name="password" id="password" minLength="8" maxLength="20" onKeyDown={onEnterPass} onChange={handleChange} onBlur={(ev) => validate(ev.target)} />
                        <div className="error-con">
                            {errors.password}
                        </div>
                    </React.Fragment> : null}
                {isChangePass && <React.Fragment>
                    <div className="label-count flex space-between">
                        <label htmlFor="newPassword">* New password</label>
                        <div>
                            <FontAwesomeIcon className="eye" icon={isPasswordVisible.newPassword ? faEye : faEyeSlash} style={{ color: "#4F4F4F" }} onClick={() => togglePassVisibility("newPassword")} />
                            <span className="count password">{newPassword?.length | 0} / 20</span>
                        </div>
                    </div>
                    <input type={isPasswordVisible.newPassword ? "text" : "password"} name="newPassword" id="newPassword" minLength="8" maxLength="20" onKeyDown={onEnterPass} onChange={handleChange} onBlur={(ev) => validate(ev.target)} />
                    <div className="error-con">
                        {errors.newPassword}
                    </div>
                </React.Fragment>}
                <div className="error-con">
                    {submitError && <div className="error">{submitError}</div>}
                </div>
                <button type="submit" disabled={isFormValid ? false : true}>{isLoading ? <Loader /> : btnTxt}</button>
            </form>

            <span className="bottom">{bottomLine}</span>


        </div>
    )
}
