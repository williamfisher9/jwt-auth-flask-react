import './Register.css'
import logo from '../../assets/logo_full.png'

export default function Register() {
    return <div className="register-main-container">
        <div className="register-container">
            <div className='auth-logo'>
                            <img src={logo} id='logo' />
                        </div>

            <div className='field-group'>
                <input className='form-field' type='text' id='emailAddress' name='emailAddress' autoComplete='off' placeholder='email address'/>
                <i className="field-icon fa-solid fa-envelope fa-fw"></i>
                <label className='form-field-error' htmlFor='emailAddress'></label>
            </div>

            <div className='field-group'>
                <input className='form-field' type='text' id='firstName' name='firstName' autoComplete='off' placeholder='first name'/>
                <i className="field-icon fa-solid fa-user fa-fw"></i>
                <label className='form-field-error' htmlFor='firstName'></label>
            </div>

            <div className='field-group'>
                <input className='form-field' type='text' id='lastName' name='lastName' autoComplete='off' placeholder='last name'/>
                <i className="field-icon fa-solid fa-user fa-fw"></i>
                <label className='form-field-error' htmlFor='lastName'></label>
            </div>

            <div className='field-group'>
                <input className='form-field' type='password' id='password' name='password' placeholder='password'/>
                <i className="field-icon fa-solid fa-lock fa-fw"></i>
                <label className='form-field-error' htmlFor='password'></label>
            </div>

            <div className='field-submit-btn'>
                register
            </div>
        </div>
    </div>
}