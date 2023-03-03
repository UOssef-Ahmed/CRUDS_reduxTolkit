import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useRouteError } from "react-router-dom";

function Error() {

    const error = useRouteError();
    const navigator=useNavigate()
    
    
    return (
    <div className='mt-5 text-center'>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <p> <i>{error.statusText || error.message}</i> </p>
        <Button variant="success " onClick={()=>navigator('/',{replace:true})}>Home</Button>
        
    </div>
  )
}

export default Error
