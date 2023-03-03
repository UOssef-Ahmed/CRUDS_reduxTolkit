import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const withGuard = (Component) => {
  return ()=>{
    const nav=useNavigate()
    const {isLoggeIn}=useSelector((state)=>state.auth)
    useEffect(()=>{
        !isLoggeIn&&nav('/')
    },[isLoggeIn,nav])
    return <Component />
    
};
}

export default withGuard
