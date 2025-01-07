
import './Login.css'
import logo from '../../assets/logo_full.png'
import { useEffect, useState } from 'react'
import loadingIcon from '../../assets/loading-icon.gif'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'

function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        window.localStorage.clear()
    }, [])

    const [formFieldsObj, setFormFieldsObj] = useState({
        username: {value: '', hasError: false, error: ''}, 
        password: {value: '', hasError: false, error: ''},
        formError: {value: '', hasError: false, error: ''},
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleFormChange = (event) => {
        setFormFieldsObj({...formFieldsObj, [event.target.name]: {...formFieldsObj[event.target.name], value: event.target.value}})
    }

    const handleLoginRequest = () => {
        let hasErrors = false;
        let errors = {username: '', password: ''}


        if(formFieldsObj.username.value == ''){
            hasErrors = true;
            errors = {...errors, username: 'Username field is required'};
        }
        
        if(formFieldsObj.password.value == ''){
            hasErrors = true;
            errors = {...errors, password: 'Password field is required'};
        }

        




        if(!hasErrors) {
            setIsLoading(true)

            axios.post("http://localhost:8080/api/v1/users/login", {
                "username": formFieldsObj.username.value,
                "password": formFieldsObj.password.value
            })
            .then(res => {
                if(res.status == 200 || res.status == 201){
                    window.localStorage.setItem('token', res.data.response.message.token)
                    window.localStorage.setItem('user_id', res.data.response.message.user_id)
                    navigate(`/user/${res.data.response.message.user_id}/home`)
                }

                setIsLoading(false)
            }).catch(err => {
                if(err.status == 401 || err.status == 403){
                    setFormFieldsObj({
                        username: {...formFieldsObj.username, hasError: false, error: ''},
                        password: {...formFieldsObj.password, hasError: false, error: ''},
                        formError: {value: '', hasError: true, error: `${err.response.data.response.status}: ${err.response.data.response.message}`},
                    })

                    setIsLoading(false)

                }
            })

        } else {
            setFormFieldsObj({
                username: {...formFieldsObj.username, hasError: errors.username != '' ? true : false, error: errors.username},
                password: {...formFieldsObj.password, hasError: errors.password != '' ? true : false, error: errors.password},
                formError: {value: '', hasError: false, error: ''},
            })
        }




    }

    return <div className="login-main-container">
        {isLoading ? 
                    <div className='loading-icon-container'>
                        <img src={loadingIcon} />
                    </div>
                : null}

        <form className="login-container">
            <div className='auth-logo'>
                <img src={logo} id='logo'/><span style={{fontSize: "2.2rem", color: "RGB(221, 195, 126)", fontWeight: "600"}}>| LOGIN</span>
            </div>

            <div className='field-group'>
                <input className='form-field' type='text' id='username' name='username' autoComplete='off' placeholder='username' onChange={handleFormChange} onKeyDown={(e) => {if (e.key === "Enter") handleLoginRequest();}} />
                <i className="field-icon fa-solid fa-envelope fa-fw"></i>
                <label className='form-field-error' htmlFor='username'>{formFieldsObj.username.hasError ? formFieldsObj.username.error : ''}</label>
            </div>

            <div className='field-group'>
                <input className='form-field' type='password' id='password' name='password' autoComplete='off' placeholder='password' onChange={handleFormChange} onKeyDown={(e) => {if (e.key === "Enter") handleLoginRequest();}} />
                <i className="field-icon fa-solid fa-lock fa-fw"></i>
                <label className='form-field-error' htmlFor='password'>{formFieldsObj.password.hasError ? formFieldsObj.password.error : ''}</label>
            </div>

           
            <div className='field-submit-btn' onClick={handleLoginRequest}>
                login
            </div>

            <p>Don't have an account? <Link style={{color: "goldenrod", textDecoration: "underline"}} to='/register'>Sign up</Link></p>

            <p className='form-error'>{formFieldsObj.formError.hasError ? formFieldsObj.formError.error : ''}</p>
        </form>
    </div>
}

export default Login