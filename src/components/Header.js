import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {login,logout} from "../state/authSlice"
const Header = () => {
  const {isLoggeIn}=useSelector((state)=>state.auth)
  const dispatsh=useDispatch()
  return (
    <div className="header">
      <h1 ><NavLink to="/" end style={{ color: "darkred" , textDecoration: "none" }}>CRUD APP</NavLink></h1>
      <ul className="nav" style={{background:"#495057"}}>
        <li>
        <Button info="success"><NavLink to="/" end>Home</NavLink></Button>
        </li>
        <li>
        <Button variant="success"><NavLink to="product/add">Add Post</NavLink></Button>
        </li>
       
       <li className="login" ><Button variant="danger"
        style={{cursor: 'pointer'}}
        onClick={()=>isLoggeIn?dispatsh(logout()):dispatsh(login())}>
         {isLoggeIn?'sign out':'sign in'}</Button>
        </li>
        

      </ul>
    </div>
  );
};

export default Header;
