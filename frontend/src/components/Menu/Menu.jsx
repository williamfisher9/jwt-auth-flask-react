import './Menu.css'
import logoImage from '../../assets/logo_image.png'
import logoText from '../../assets/logo_text.png'

import { Link } from 'react-router'

function Menu(){
    return <div className="menu-container">
        <Link className='logo-container' to={'/'}>
            <img src={logoImage} id='logo-image' />
            <img src={logoText} id='logo-text' />
        </Link>

        <div className='menu-items-container'>
            <Link className='menu-item' to='/login'>
                <i className="icon fa-solid fa-arrow-right-to-bracket fa-fw"></i>
                <p className='icon-desc'>login</p>
            </Link>

            <Link className='menu-item' to='/register'>
                <i className="icon fa-solid fa-user-plus fa-fw"></i>
                <p className='icon-desc'>register</p>
            </Link>
        </div>
    </div>
}

export default Menu