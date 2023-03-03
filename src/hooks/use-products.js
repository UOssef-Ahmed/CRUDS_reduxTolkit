import{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProduct } from '../state/ProductsSlice'

const useProducts=()=>{
const {id}=useParams()
    const {record,loading,error}=useSelector((state)=>state.products)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getProduct(id))
    },[dispatch,id])

    return{
        record,
        loading,
        error
    }
}
export default useProducts