import './Menu.css'
import logoImage from '../../assets/logo_image.png'
import logoText from '../../assets/logo_text.png'

import { Link } from 'react-router'

function Menu(props){    
    return <div className="menu-container">
        <Link className='logo-container' to={'/'}>
            <img src={logoImage} id='logo-image' />
            <img src={logoText} id='logo-text' />
        </Link>

        <div className='menu-items-container'>

            {
                props.menuItems.map(item => {
                    return <Link className='menu-item' to={item.menu_item_link} key={item.id}>
                        <i className={`icon fa-solid ${item.menu_item_icon} fa-fw`}></i>
                        <p className='icon-desc'>{item.menu_item_name}</p>
                    </Link>
                })
            }

        </div>
    </div>
}

export default Menu