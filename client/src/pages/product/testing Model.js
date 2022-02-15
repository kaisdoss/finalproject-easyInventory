import React from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { updateProduct } from "../../action/facturesAndProductsAction";
// import {Modal,Form} from 'react-bootstrap'

function UpdateProduct({history}) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <div>
            <button onClick={() => history.goBack()}  >Back</button>

            
            {/* <Modal >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Product Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Product Name" />
    <Form.Label>Product Price</Form.Label>
    <Form.Control type="text" placeholder="Enter Product Price" />
    <Form.Label>Product Number</Form.Label>
    <Form.Control type="number" placeholder="Enter Product Number" />
    <Form.Label>Product Description</Form.Label>
    <Form.Control type="text" placeholder="Enter Product Description" />
  
  </Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
            
        </div>
    )
}

export default UpdateProduct