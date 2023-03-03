import React from "react"
import { useSelector } from "react-redux"


const Guard = ({children}) => {
  const {isLoggeIn}=useSelector((state)=>state.auth)

  const newClone=React.cloneElement(children,{title:"xo"})
  
  return (
    <>
      {isLoggeIn?newClone:(<h1 style={{color:'red'}}>sign in please</h1>)}
    </>
  )
}

export default Guard
