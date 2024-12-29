import './Home.css'
import logo from '../../assets/logo_full.png'

function Home() {
    return <div className="home-main-container">
            <div className="home-container">
                <div className='auth-logo'>
                    <img src={logo} id='home-logo' />
                </div>
            </div>
        </div>
}

export default Home