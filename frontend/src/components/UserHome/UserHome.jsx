import axios from "axios"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"

function UserHome(){
    let params = useParams();
    let navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/users/${params.id}`, { headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
        .then(res => console.log(res))
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                navigate('/login')
            }
        })
    }, [])

    return <h1>test</h1>
}

export default UserHome