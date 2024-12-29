
import './Login.css'
import logo from '../../assets/logo_full.png'

function Login() {
    return <div className="login-main-container">
        <div className="login-container">
            <div className='auth-logo'>
                <img src={logo} id='logo' />
            </div>

            <div className='field-group'>
                <input className='form-field' type='text' id='username' name='username' autoComplete='off' placeholder='username'/>
                <i className="field-icon fa-solid fa-envelope fa-fw"></i>
                <label className='form-field-error' htmlFor='username'></label>
            </div>

            <div className='field-group'>
                <input className='form-field' type='password' id='password' name='password' placeholder='password'/>
                <i className="field-icon fa-solid fa-lock fa-fw"></i>
                <label className='form-field-error' htmlFor='password'></label>
            </div>

            <div className='field-submit-btn'>
                login
            </div>
        </div>
    </div>
}

export default Login