import { Form,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewProduct } from '../state/ProductsSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const formSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  price: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const AddProduct = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading}=useSelector((state)=>state.products)


  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
     
    },
    validationSchema:formSchema,
    onSubmit: values => {
      const id=Math.floor(Math.random()*1000)
    
      dispatch(AddNewProduct({title:values.title,price:values.price,id}))
      .unwrap()
      .then(()=> navigate('/'))
  
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name of item</Form.Label>
        <Form.Control 
        type="text" placeholder="title" 
        name="title"
         onChange={formik.handleChange}
         value={formik.values.title}
         isInvalid={!!formik.errors.title}/>
           <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>price of item</Form.Label>
        <Form.Control type="number" placeholder="price" 
        name="price"
         onChange={formik.handleChange}
         value={formik.values.price}
         isInvalid={!!formik.errors.price}/>
         <Form.Control.Feedback type="invalid">
                {formik.errors.price}
              </Form.Control.Feedback>
      </Form.Group>
      
     
      <Button variant="primary" type="submit" disabled={loading} >
        Submit
      </Button>
      
    </Form>
  );
}

export default AddProduct
