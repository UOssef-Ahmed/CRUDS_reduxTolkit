import React from 'react'
import useProducts from '../hooks/use-products'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function Details(props) {
console.log(true)
  const {record}=useProducts()
  
  return (
    <Card style={{ width: '14rem' }}>
      <Card.Img variant="top" src={record?.image} />
      <Card.Body>
        <Card.Title>{record?.title}</Card.Title>
        <Card.Text>
          {record?.description.split(' ').filter((q,i)=>i<10&&q).join(' ')}...
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>price {record?.price}$</ListGroup.Item>
        </ListGroup>
    </Card>
  )
}

export default Details
