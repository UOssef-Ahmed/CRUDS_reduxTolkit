import React, { useState } from 'react'
import{ Table,Button,ButtonGroup,}from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../state/ProductsSlice'
function PostList({records,loading,error}) {
const[search,setSearch]=useState('')
    const dispatch=useDispatch()
const nav=useNavigate()

const {isLoggeIn}=useSelector((state)=>state.auth)
    const data= records.filter((item) => {
        return search.toLowerCase() === ''? item : item.title.toLowerCase().includes(search)
      })
        .map((el,i)=>
       (
            <tr key={i}>
            <td>#{++i}</td>
            <td>{el.title}</td>
            <td>{el.price}</td>
            <td>
            <ButtonGroup aria-label="Basic example ">
                <Button info="success" onClick={()=>nav(`product/${el.id}`)}>show</Button>
                <Button variant="success" onClick={()=>nav(`product/${el.id}/edit`)}>Edit</Button>
                <Button variant="danger" onClick={()=>dispatch(deleteProduct(el.id))} disabled={!isLoggeIn}>Delete</Button>
            </ButtonGroup>
            </td>
        </tr>
        )
    )

  return (
    <div>
        <div className="row">
            <div className="col-12">
                    <input className="form-control border-secondary py-2" placeholder='search by title' type="search"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)} 
                        />
            </div>
    </div>
        {loading ? (<h1 className='load'>loading</h1>):
        error?(<h3>{error}</h3>)
        :(<Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ width: "50%" }}>Title</th>
                        <th style={{ width: "20%" }}>price</th>
                        <th style={{ width: "25%" }}>action</th>
                    </tr>
                </thead>
            <tbody>
           {data}
            </tbody>
        </Table>)}
    </div>
  )
}

export default PostList
