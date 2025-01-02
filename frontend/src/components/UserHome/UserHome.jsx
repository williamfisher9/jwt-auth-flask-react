import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

function UserHome(){
    let params = useParams();
    let navigate = useNavigate();

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/users/${params.id}`, { headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
        .then(res => {
            setUsers(res.data.response.message)
        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                navigate('/login')
            }
        })
    }, [])

    return <div>
        {
            users.map(item => {
                return <h1 key={item.id}>{item.username}</h1>
            })
        }
    </div>
    
}

export default UserHome