import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { useForm } from '../hooks/useForm'

export const AuthFormCmp = ({ type, title, btnTxt, submitFunc, bottomLine }) => {

    // const dispatch = useDispatch()

    // const [credentials, handleChange] = useForm({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: ''
    // })

    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const onSubmit = () => {
        console.log('submitted!');
        submitFunc(credentials)
    }

    // OPTIONAL TODO - remove formik, check only the active input and change only the relevant field in the state.
    const validate = (values) => {
        console.log("MyForm ~ values", values)
        const errors = {};
        if (type === 'signup') {
            if (!values.firstName) {
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
        if (values.password.length < 8) {
            errors.password = 'too short pass'
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)) {
            errors.password = 'Use at least one number and one capital letter'
        }

        setCredentials(values)

        return errors;
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
                    <Field type="email" name="email" placeholder="Email" />
                    <div className="error-con">
                        <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <Field type="password" name="password" placeholder="Password" />
                    <div className="error-con">
                        <ErrorMessage name="password" component="div" className="error" />
                    </div>
                    <button type="submit">{btnTxt}</button>
                </Form>
            </Formik>
            <span>{bottomLine}</span>


        </div>
    )
}
