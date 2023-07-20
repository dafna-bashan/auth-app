import React, { useEffect, useRef, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';

export function AuthFormCmp({ type, title, btnTxt, submitFunc, bottomLine }) {

    const dispatch = useDispatch()
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const error = useSelector(state => state.errorModule.error)
    const isLoading = useSelector(state => state.systemModule.isLoading)
    // const inputRef = useRef(null)

    useEffect(() => {
        dispatch({ type: 'REMOVE_ERROR' })
    }, [dispatch])

    const onSubmit = () => {
        console.log('submitted!');
        dispatch({ type: 'REMOVE_ERROR' })
        setIsSubmiting(true)
        submitFunc(credentials)
    }


    // OPTIONAL TODO - remove formik, check only the active input and change only the relevant field in the state.


    const validate = (values) => {
        // console.log("MyForm ~ values", values)
        values = values.replace(/\s/g, '')
        if (isSubmiting) {
            dispatch({ type: 'REMOVE_ERROR' })
            setIsSubmiting(false)
        }
        const errors = {};
        if (type === 'signup') {
            if (!values.firstName) {
                // if(document.activeElement === inputRef.current) 
                errors.firstName = 'Required';
            }
            if (!values.lastName) {
                errors.lastName = 'Required';
            }
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        if (!/^.{8,20}$/.test(values.password)) {
            errors.password = 'Use at least 8 characters'
        }
        // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) 
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/.test(values.password)) {
            errors.password = 'Use at least one number, one capital letter and one lower-case letter. '
        }

        setCredentials(values)

        return errors;
    }

    function onEnterPass(ev) {
        if (ev.code === 'Space') ev.preventDefault()
    }

    return (
        <div className="form-container">
            <div className="main-title">Auth app</div>
            <div className="title">{title}</div>
            <Formik
                initialValues={credentials}
                validate={validate}
                onSubmit={onSubmit}>
                <Form className="flex column">
                    {type === 'signup' &&
                        <React.Fragment>
                            <Field name="firstName" placeholder="First name" />
                            <div className="error-con">
                                <ErrorMessage name="firstName" component="div" className="error" />
                            </div>
                            <Field name="lastName" placeholder="Last name" />
                            <div className="error-con">
                                <ErrorMessage name="lastName" component="div" className="error" />
                            </div>
                        </React.Fragment>
                    }
                    <Field type="email" name="email" placeholder="Email" onKeyDown={onEnterPass} />
                    <div className="error-con">
                        <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <Field type="password" name="password" placeholder="Password" onKeyDown={onEnterPass} />
                    <div className="error-con">
                        <ErrorMessage name="password" component="div" className="error" />
                        {/* {error && <ErrorModal error={error} />} */}
                        {error && <div className="error">{error}</div>}
                    </div>
                    <button type="submit">{isLoading ? <Loader /> : btnTxt}</button>
                </Form>
            </Formik>
            <span>{bottomLine}</span>


        </div>
    )
}
