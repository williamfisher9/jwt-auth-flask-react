import './Layout.css'
import Menu from '../Menu/Menu'
import { Outlet } from 'react-router'

function Layout(){
    return <div className='layout-container'>
        <Menu />
        <div className='content-container'>
            <Outlet />
        </div>
    </div>
}

export default Layout