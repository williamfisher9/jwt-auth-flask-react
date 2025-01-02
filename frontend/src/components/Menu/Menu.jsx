import './Menu.css'
import logoImage from '../../assets/logo_image.png'
import logoText from '../../assets/logo_text.png'

import { Link, useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Menu(){

    const location = useLocation()
    const navigate = useNavigate()

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/menu-items", window.localStorage.getItem("token") ? {headers: {"Authorization": `Bearer ${window.localStorage.getItem("token")}`}} : null)
        .then(res => {
            console.log(res.data)
            setMenuItems(res.data)
        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                navigate('/login')
            }
        })
    }, [location])
    
    return <div className="menu-container">
        <Link className='logo-container' to={'/'}>
            <img src={logoImage} id='logo-image' />
            <img src={logoText} id='logo-text' />
        </Link>

        <div className='menu-items-container'>

            {
                menuItems.map(item => {
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