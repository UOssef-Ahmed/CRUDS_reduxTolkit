import { configureStore } from '@reduxjs/toolkit'
import products from './ProductsSlice'
import auth from './authSlice'

export const store = configureStore({
  reducer: {
    products,
    auth

},
})

