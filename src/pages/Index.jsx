import React, { useEffect } from 'react'
import PostList from '../components/PostList'
import { useDispatch,useSelector } from 'react-redux'
import { fetchProducts } from '../state/ProductsSlice'
function Index() {

  const dispatch=useDispatch()
  const {records,loading,error}=useSelector((state)=>state.products)

  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])
  
  return (
    <div>
      <PostList records={records} loading={loading} error={error}/>
    </div>
  )
}

export default Index
