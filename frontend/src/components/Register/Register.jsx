import './Register.css'
import logo from '../../assets/logo_full.png'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';

import loadingIcon from '../../assets/loading-icon.gif'

export default function Register() {
    const navigate = useNavigate();

    useEffect(() => {
            window.localStorage.clear()
        }, [])

    const [formFieldsValues, setFormFieldsValues] = useState({
        emailAddress: {value: '', error: '', hasError:false }, 
        firstName: {value: '', error: '', hasError:false }, 
        lastName: {value: '', error: '', hasError:false }, 
        password: {value: '', error: '', hasError:false },
        formError: {value: '', error: '', hasError:false }
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleRegisterRequest = () => {
        let hasErrors = false;
        let errors = {emailAddress: '', firstName: '', lastName: '', password: ''}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(formFieldsValues.emailAddress.value) || formFieldsValues.emailAddress.value == ''){
            hasErrors = true;
            errors = {...errors, emailAddress: 'Invalid email address format'};
        }
        
        if(formFieldsValues.firstName.value == ''){
            hasErrors = true;
            errors = {...errors, firstName: 'First name field is required'};
        }

        if(formFieldsValues.lastName.value == ''){
            hasErrors = true;
            errors = {...errors, lastName: 'Last name field is required'};
        }

        if(formFieldsValues.password.value == ''){
            hasErrors = true;
            errors = {...errors, password: 'password field is required'};
        }

        if(!hasErrors) {
            setIsLoading(true)

            axios.post("http://localhost:8080/api/v1/users", {
                "username": formFieldsValues.emailAddress.value,
                "first_name": formFieldsValues.firstName.value,
                "last_name": formFieldsValues.lastName.value,
                "password": formFieldsValues.password.value
            })
            .then(res => {
                if(res.status == 200 || res.status == 201){
                    navigate('/login')
                }

                setIsLoading(false)
            }).catch(err => {
                if(err.status == 409){
                    setFormFieldsValues({
                        emailAddress: {...formFieldsValues.emailAddress, hasError: false, error: ''},
                        firstName: {...formFieldsValues.firstName, hasError: false, error: ''},
                        lastName: {...formFieldsValues.lastName, hasError: false, error: ''},
                        password: {...formFieldsValues.password, hasError: false, error: ''},
                        formError: {value: '', hasError: true, error: 'Username exists in the system'},
                    })

                    setIsLoading(false)

                }
            })

        } else {
            setFormFieldsValues({
                emailAddress: {...formFieldsValues.emailAddress, hasError: errors.emailAddress != '' ? true : false, error: errors.emailAddress},
                firstName: {...formFieldsValues.firstName, hasError: errors.firstName != '' ? true : false, error: errors.firstName},
                lastName: {...formFieldsValues.lastName, hasError: errors.lastName != '' ? true : false, error: errors.lastName},
                password: {...formFieldsValues.password, hasError: errors.password != '' ? true : false, error: errors.password},
                formError: {value: '', hasError: false, error: ''},
            })
        }
    }

    const handleFieldChange = (event) => {
        if(event.target.name == 'emailAddress')
            setFormFieldsValues({...formFieldsValues, emailAddress: {...formFieldsValues.emailAddress, value: event.target.value}})

        if(event.target.name == 'firstName')
            setFormFieldsValues({...formFieldsValues, firstName: {...formFieldsValues.firstName, value: event.target.value}})

        if(event.target.name == 'lastName')
            setFormFieldsValues({...formFieldsValues, lastName: {...formFieldsValues.lastName, value: event.target.value}})

        if(event.target.name == 'password')
            setFormFieldsValues({...formFieldsValues, password: {...formFieldsValues.password, value: event.target.value}})
    }

    return <div className="register-main-container">
        {isLoading ? 
            <div className='loading-icon-container'>
                <img src={loadingIcon} />
            </div>
        : null}

        <form className="register-container">
            <div className='auth-logo'>
                            <img src={logo} id='logo' /><span style={{fontSize: "2.2rem", color: "RGB(221, 195, 126)", fontWeight: "600"}}>| REGISTER</span>
                        </div>

            <div className='field-group'>
                <input className='form-field' type='text' id='emailAddress' name='emailAddress' autoComplete='off' placeholder='email address' onChange={handleFieldChange} onKeyDown={(e) => {if (e.key === "Enter") handleRegisterRequest();}} />
                <i className="field-icon fa-solid fa-envelope fa-fw"></i>
                <label className='form-field-error' htmlFor='emailAddress'>{formFieldsValues.emailAddress.hasError ? formFieldsValues.emailAddress.error : ''}</label>
            </div>

            <div className='field-group'>
                <input className='form-field' type='text' id='firstName' name='firstName' autoComplete='off' placeholder='first name' onChange={handleFieldChange} onKeyDown={(e) => {if (e.key === "Enter") handleRegisterRequest();}} />
                <i className="field-icon fa-solid fa-user fa-fw"></i>
                <label className='form-field-error' htmlFor='firstName'>{formFieldsValues.firstName.hasError ? formFieldsValues.firstName.error : ''}</label>
            </div>

            <div className='field-group'>
                <input className='form-field' type='text' id='lastName' name='lastName' autoComplete='off' placeholder='last name' onChange={handleFieldChange} onKeyDown={(e) => {if (e.key === "Enter") handleRegisterRequest();}} />
                <i className="field-icon fa-solid fa-user fa-fw"></i>
                <label className='form-field-error' htmlFor='lastName'>{formFieldsValues.lastName.hasError ? formFieldsValues.lastName.error : ''}</label>
            </div>

            <div className='field-group'>
                <input className='form-field' type='password' id='password' name='password' autoComplete='off' placeholder='password' onChange={handleFieldChange} onKeyDown={(e) => {if (e.key === "Enter") handleRegisterRequest();}} />
                <i className="field-icon fa-solid fa-lock fa-fw"></i>
                <label className='form-field-error' htmlFor='password'>{formFieldsValues.password.hasError ? formFieldsValues.password.error : ''}</label>
            </div>

            <div className='field-submit-btn' onClick={handleRegisterRequest}>
                register
            </div>

            <p>You have an account? <Link style={{color: "goldenrod", textDecoration: "underline"}} to='/login'>Login</Link></p>

            <p className='form-error'>{formFieldsValues.formError.hasError ? formFieldsValues.formError.error : ''}</p>
        </form>
    </div>
}