import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Nav from "./Components/Nav";
import { Dashboard } from "./Pages/Dashboard";
import React from "react";

const WithNavbar = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}

const Home = ()=>{
  const navigate = useNavigate()
  useEffect(()=>{
    navigate("dashboard")
  })
  return <></>
}

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<WithNavbar />} >
            <Route path="/dashboard" element={<Dashboard />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}