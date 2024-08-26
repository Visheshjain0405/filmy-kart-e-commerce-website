import React, { useState, useEffect } from 'react'
import "./Product.css"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Sidebar from '../Sidebar/Sidebar';
import axios from "axios"
import Select from "react-bootstrap/FormSelect"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function Addproduct() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // const [categories, setCategories] = useState([]);
  // const [selectedOption, setSelectedOption] = useState('');
  // const [product, setProduct] = useState({
  //   name: '',
  //   description: '',
  //   price: '',
  //   qty: '',
  //   sizes: [],
  //   status: '',
  //   images: [],
  //   category: '',
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProduct({ ...product, [name]: value });
  // };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setProduct({ ...product, images: files });
  // };

  // const handleCheckboxChange = (e) => {
  //   const selectedSizes = e.target.checked
  //     ? [...product.sizes, e.target.value]
  //     : product.sizes.filter((size) => size !== e.target.value);

  //   setProduct({ ...product, sizes: selectedSizes });
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   Object.entries(product).forEach(([key, value]) => {
  //     if (key === 'images') {
  //       value.forEach((image) => formData.append('images', image));
  //     } else {
  //       formData.append(key, value);
  //     }
  //   });

  //   try {
  //     await axios.post('http://localhost:5000/api/products', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('Product added successfully');
  //     console.log(product);
  //   } catch (error) {
  //     console.error('Error adding product:', error);
  //   }


  // };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/getcategories');
  //       const result = await response.json();
  //       setCategories(result);
  //       console.log(result)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };
  return (
    <div>
      <Sidebar />

      <Button className='ml-[260px]' variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Addproduct