import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import UserHome from "./components/UserHome/UserHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<UserHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
