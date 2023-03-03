import { editProduct } from '../state/ProductsSlice';
import useProducts from '../hooks/use-products'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import withGuard from '../util/withGuard';
import { Form,Button } from 'react-bootstrap';
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

const EditProduct = () => {

  const {record,loading}=useProducts()
  const dispatch=useDispatch()
  const navigate=useNavigate()

 
  const formik = useFormik({
    initialValues: {
      title: record?record?.title:'',
      price: record?record?.price:'',
    },
    enableReinitialize:true,
    validationSchema:formSchema,
    onSubmit: values => {
      
    
      dispatch(editProduct({id:record.id,
        title:values.title,
        price:values.price
      }))
      .unwrap()
      .then(()=> navigate('/'))
  
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name of item</Form.Label>
          <Form.Control type="text" placeholder="title"
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
        <Form.Control type="number" placeholder="price" name="price"
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
  )
}

export default withGuard(EditProduct)
