import './Layout.css'
import Menu from '../Menu/Menu'
import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'

function Layout(){

    const location = useLocation()

    useEffect(() => {
        console.log("clearing local storage...")
        window.localStorage.clear()
    }, [location.pathname == '/login' || location.pathname == '/logout'])

    return <div className='layout-container'>
        <Menu />
        <div className='content-container'>
            <Outlet />
        </div>
    </div>
}

export default Layout