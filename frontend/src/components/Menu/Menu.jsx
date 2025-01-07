import './Menu.css'
import logoImage from '../../assets/logo_image.png'
import logoText from '../../assets/logo_text.png'

import { Link } from 'react-router'



function Menu(props){    

    /*
    if(item.menu_item_link == '/user-home'){
                        return <Link className='menu-item' to={`/user/${window.localStorage.getItem('user_id')}/home`} key={item.id}>
                            <i className={`icon fa-solid ${item.menu_item_icon} fa-fw`}></i>
                            <p className='icon-desc'>{item.menu_item_name}</p>
                        </Link>
                    }

                    if(item.menu_item_link == '/user-settings'){
                        return <Link className='menu-item' to={`/user/${window.localStorage.getItem('user_id')}/settings`} key={item.id}>
                            <i className={`icon fa-solid ${item.menu_item_icon} fa-fw`}></i>
                            <p className='icon-desc'>{item.menu_item_name}</p>
                        </Link>
                    }
    
    */

    return <div className="menu-container">
        <Link className='logo-container' to={'/'}>
            <img src={logoImage} id='logo-image' />
            <img src={logoText} id='logo-text' />
        </Link>

        <div className='menu-items-container'>

            {
                props.menuItems.map(item => {
                    if(item.menu_item_link == 'home'){
                        return <Link className='menu-item' to={`/user/${window.localStorage.getItem('user_id')}/home`} key={item.id}>
                            <i className={`icon fa-solid ${item.menu_item_icon} fa-fw`}></i>
                            <p className='icon-desc'>{item.menu_item_name}</p>
                        </Link>
                    }

                    if(item.menu_item_link == 'settings'){
                        return <Link className='menu-item' to={`/user/${window.localStorage.getItem('user_id')}/settings`} key={item.id}>
                            <i className={`icon fa-solid ${item.menu_item_icon} fa-fw`}></i>
                            <p className='icon-desc'>{item.menu_item_name}</p>
                        </Link>
                    }

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