import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import './UserHome.css'

function UserHome(){
    let params = useParams();
    let navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [showImageUploader, setShowImageUploader] = useState(false)
    const [selectedFile, setselectedFile] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/users/${params.id}`,  window.localStorage.getItem('token') ? { headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}} : null)
        .then(res => {
            setUsers(res.data.response.message)
        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                navigate('/login')
            }
        })
    }, [])

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8080/api/v1/users/${id}`,  window.localStorage.getItem('token') ? { headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}} : null)
        .then(res => {
            setUsers(res.data.response.message)
        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                navigate('/login')
            }
        })
    }

    const handleProfileImageUpload = (id) => {
        window.localStorage.getItem("user_id") == id ? setShowImageUploader(true) : setShowImageUploader(false)
    }

    const handleFileChange = (e) => {
        const selectedFileList = [];
        for (let i = 0; i < e.target.files.length; i++) {
          selectedFileList.push(e.target.files.item(i));
        }
        setselectedFile(selectedFileList);
      };
    
      // Upload file to server
      const handleFileUpload = async (id) => {
        // when not a frm no need for this
        //ev.preventDefault();
    
        const data = new FormData();

        // Append the file to the request body
        //for (let i = 0; i < selectedFile.files.length; i++) {
          //data.append("file", selectedFile.files[i], selectedFile.files[i].name);
        //}
    
        data.append("file", selectedFile[0], selectedFile[0].name);
        data.append("user_id", id);

        try {
          
          const response = await axios.post(
            "http://localhost:8080/api/v1/users/profile-img",
            data, window.localStorage.getItem('token') ? { headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}} : null
          );
          const body = response.data;
          console.log(body);
          if (response.status === 200) {
            console.log("file uploaded successfully")
          }
        } catch (error) {
          console.error(error);
          console.log("file uploaded failed")
        }
      };
    








    return <div className="users-main-container">

        {
            showImageUploader ? 
                <div className="profile-img-uploader-container">
                    <div className="profile-img-uploader">
                        <input type="file" id="profileImg" name="profileImg" accept="image/png, image/jpeg" onChange={handleFileChange}></input>
                        <input type="button" id="closeAndSubmit" name="closeAndSubmit" value="UPLOAD" onClick={() => handleFileUpload(window.localStorage.getItem('user_id'))}/>
                    </div>
                </div>
            : null
        }

        <div className="users-grid">
        {
            users.map(item => {
                return (
                  <div className="card-container" key={item.id}>
                    <img
                      src=""
                      alt="profile-img"
                      className={
                        window.localStorage.getItem("user_id") == item.id
                          ? "profile-img personal-profile-img"
                          : "profile-img"
                      }

                      onClick={() => handleProfileImageUpload(item.id)}
                    />

                    <p className="text-elem">{item.username}</p>
                    <p className="text-elem">{item.first_name}</p>
                    <p className="text-elem">{item.last_name}</p>
                    <p className="text-elem">{item.id}</p>

                    <div className="card-btns">
                      {window.localStorage.getItem("user_id") != item.id ? (
                        <button
                          className="card-btn"
                          onClick={() => deleteItem(item.id)}
                        >
                          <i className="card-btn-icon fa-solid fa-trash"></i>
                        </button>
                      ) : null}
                      <button className="card-btn">
                        <i className="card-btn-icon fa-solid fa-info"></i>
                      </button>
                    </div>
                  </div>
                );
            })
        }
    </div>
    </div>
    
}

export default UserHome