import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import UserSettings from "./components/UserSettings/UserSettings";
import UserHome from "./components/UserHome/UserHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id/home" element={<UserHome />} />
          <Route path="/user/:id/settings" element={<UserSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
