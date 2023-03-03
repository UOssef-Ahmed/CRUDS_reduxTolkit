
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Index from "./pages/Index";
import Error from "./pages/Error";
import { store } from "./state";
import { Provider } from "react-redux";

import Guard from "./components/Guard";
import React, { Suspense } from "react";

const AddProduct = React.lazy(() => import('./pages/AddProduct'));
const Details = React.lazy(() => import('./pages/Details'));
const EditProduct = React.lazy(() => import('./pages/EditProduct'));
const ProductParamHandler=({params})=> {
  if(isNaN(params.id )) {
    throw new Response
    ("Bad Request",
     {
      statusText:'hallo error'
      ,status: 400
     }
    )
  }
 
}

const router=createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    errorElement:<Error />,
    children:[
      {index:true,element:<Index />},
      {path:"product/add",element:<Suspense fallback="wait"><Guard><AddProduct /></Guard></Suspense>},
      { 
        path:"product/:id/edit",
        element:<Suspense fallback="wait"><EditProduct /></Suspense>,
        loader:ProductParamHandler,
      },
      {path:"product/:id",
      element:<Suspense fallback="wait"><Details /></Suspense>,
      loader:ProductParamHandler,
    },
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
  
);


