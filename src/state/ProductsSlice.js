import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const apiLink='http://localhost:9000/products/'




export const fetchProducts=createAsyncThunk('products/fetchProducts',async(_,thunkAPI)=>{
 
const {rejectWithValue}=thunkAPI
try {
    const res=await fetch(apiLink)
    const data =await res.json()
   
    return data
} catch (error) {
    
    return rejectWithValue(error.message)
}
})
    //get one product 
export const getProduct=createAsyncThunk('products/getProduct',async(id,thunkAPI)=>{
   
const {rejectWithValue}=thunkAPI
try {
    const res=await fetch(apiLink+id)

    const data =await res.json()
   
    return data
} catch (error) {
    
    return rejectWithValue(error.message)
}
})

    //AddNewProduct

export const AddNewProduct=createAsyncThunk('products/AddNewProduct',async(Product,thunkAPI)=>{
   
const {rejectWithValue,getState}=thunkAPI
const {auth}=getState()
Product.userId=auth.id
try {
    const res=await fetch(apiLink,{
        method:'POST',
        body:JSON.stringify(Product),
        headers:{
            "Content-type":"application/json;charset=UTF-8",
        }
    })

    const data =await res.json()
   
    return data
} catch (error) {
    
    return rejectWithValue(error.message)
}
})
    //editProduct

export const editProduct=createAsyncThunk('products/editProduct',async(Product,thunkAPI)=>{
   
const {rejectWithValue}=thunkAPI

try {
    const res=await fetch(apiLink+Product.id,{
        method:'PATCH',
        body:JSON.stringify(Product),
        headers:{
            "Content-type":"application/json;charset=UTF-8",
        }
    })

    const data =await res.json()
   
    return data
} catch (error) {
    
    return rejectWithValue(error.message)
}
})

//delete product
export const deleteProduct=createAsyncThunk('products/deleteProduct',async(id,thunkAPI)=>{
   
const {rejectWithValue}=thunkAPI
try {
    await fetch(apiLink+id,{
        method:'DELETE',
    })
    
    return id
} catch (error) {
    
    return rejectWithValue(error.message)
}
})

const initialState={records: [],loading:false,error:null,record:null}

const productsSlice=createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
         

        //get all products 

        .addCase(fetchProducts.pending, (state,action) => {
            state.loading=true
            state.error=null
        })
          .addCase(fetchProducts.fulfilled, (state,action) => {
            state.loading=false
            state.records=action.payload
            state.record=null
        })
          .addCase(fetchProducts.rejected, (state,action) => {
            state.loading=false
            state.error=action.payload
        })

        //get one product 
        .addCase(getProduct.pending, (state) => {
            state.loading=true
            state.error=null
        })
          .addCase(getProduct.fulfilled, (state,action) => {
            
            state.loading=false
            state.record=action.payload
        })
          .addCase(getProduct.rejected, (state,action) => {
            state.loading=false
            state.error=action.payload
        })


        //AddNewProduct

        .addCase(AddNewProduct.pending, (state) => {
            state.loading=true
            state.error=null
        })
          .addCase(AddNewProduct.fulfilled, (state,action) => {
            
            state.loading=true
            state.records.push(action.payload)
        })
          .addCase(AddNewProduct.rejected, (state,action) => {
            state.loading=true
            state.error=action.payload
        })
    
        //editProduct

        .addCase(editProduct.pending, (state) => {
            state.loading=true
            state.error=null
        })
          .addCase(editProduct.fulfilled, (state) => {
            
            state.loading=true
           
        })
          .addCase(editProduct.rejected, (state,action) => {
            state.loading=true
            state.error=action.payload
        })

     //delete product
     
        .addCase(deleteProduct.pending, (state) => {
            state.loading=true
            state.error=null
        })
          .addCase(deleteProduct.fulfilled, (state,action) => {
            
            state.loading=false
            state.records=state.records.filter((el)=>el.id!==action.payload)
           
        })
          .addCase(deleteProduct.rejected, (state,action) => {
            state.loading=false
            state.error=action.payload
        })

    },
});
export default productsSlice.reducer

