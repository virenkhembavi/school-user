import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login/index"
import DashBoard from "./component/DashBoard/index"
import PrivateRoute from "./component/PrivateRoute";
import { useState } from "react";


function App() {
  const [auth, setAuth] = useState(localStorage?.getItem("Auth") || false)


  return (
    <BrowserRouter >
      <Routes >
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route path="/dashboard" element={
          <PrivateRoute Auth={auth}>
            <DashBoard />
          </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
