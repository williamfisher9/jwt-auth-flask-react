import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import './UserHome.css'

function UserHome(){
    let params = useParams();
    let navigate = useNavigate();

    const [userHomeObj, setUserHomeObj] = useState({profileImg: '', firstName: ''})
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/user/${params.id}/home`,  window.localStorage.getItem('token') ? { headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}} : null)
        .then(res => {
            console.log(res.data.response.message)
            setUserHomeObj({profileImg: res.data.response.message.profile_img_url, firstName: res.data.response.message.first_name})
        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                navigate('/login')
            }
        })
    }, [])

    return (
      <div className="user-profile-container">
        <p id="profileUserName">Welcome {userHomeObj.firstName}</p>
        <img src={userHomeObj.profileImg} id="profileImage" alt="profile-img" />
      </div>
    );
  
    
}

export default UserHome