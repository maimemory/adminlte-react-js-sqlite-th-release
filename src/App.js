import React, { useState, createContext } from "react";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboard";
import Footer from "./components/footer/footer";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Context = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  return (
    <Context.Provider value={{ isLogin, setIsLogin, account, setAccount}}>
      <BrowserRouter>
        {localStorage.getItem('alreadyLogin') && <Header/>}
        {localStorage.getItem('alreadyLogin') && <Menu/>}
        <Routes>
          <Route path="/login" element={(localStorage.getItem('alreadyLogin')) ? <Navigate to="/dashboard"/> : <Login/>}/>
          <Route path="/register" element={(localStorage.getItem('alreadyLogin')) ? <Navigate to="/dashboard"/> : <Register/>}/>
          <Route path="/dashboard" element={(localStorage.getItem('alreadyLogin')) ? <Dashboard/> : <Navigate to="/login"/>}/>
          <Route exact={true} path="/" element={(localStorage.getItem('alreadyLogin')) ? <Navigate to="/dashboard"/> : <Navigate to="/login" />}/>
          <Route exact={true} path="*" element={<Navigate to="/login" />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
export { Context };
