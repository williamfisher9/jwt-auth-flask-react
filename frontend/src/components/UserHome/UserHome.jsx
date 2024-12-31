import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router"

function UserHome(){
    let params = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/users/${params.id}`, { headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [])

    return <h1>test</h1>
}

export default UserHome