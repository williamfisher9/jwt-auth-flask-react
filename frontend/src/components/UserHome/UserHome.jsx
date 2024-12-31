import { useEffect } from "react"

function UserHome(){

    useEffect(() => {
        console.log("loading")
    }, [])

    return <h1>test</h1>
}

export default UserHome