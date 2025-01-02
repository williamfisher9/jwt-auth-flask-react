import "./Layout.css";
import Menu from "../Menu/Menu";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    console.log("running use effect")
    if ((location.pathname == "/login", location.pathname == "/logout")) {
      console.log("clearing local storage...");
      console.log(location.pathname);
      window.localStorage.clear();
    }

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
  }, [location]);

  return (
    <div className="layout-container">
      <Menu menuItems={menuItems}/>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
