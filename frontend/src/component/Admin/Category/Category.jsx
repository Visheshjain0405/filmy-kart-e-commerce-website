import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { useState, useEffect } from 'react';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
// import "./Category.css"
function Category() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [editshow, editsetShow] = useState(false);
  const edithandleClose = () => editsetShow(false);
  const edithandleShow = () => editsetShow(true);



  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSaveCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('image', categoryImage);
      formData.append('name', categoryName);

      await axios.post('http://localhost:5000/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Category Saved")
      console.log('Category saved successfully');

      handleShow(false);
      // Additional logic after successful category save
      setCategoryName('')
      setCategoryImage(null)
      handleClose()

    } catch (error) {
      console.error('Error saving category', error);
    }
  };




  useEffect(() => {
    // Fetch categories from the server when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getcategories');
        setCategories(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (categoryId) => {
    const selectedCategory = categories.find((category) => category._id === categoryId);
    setCategoryName(selectedCategory.name);
    setSelectedCategoryId(categoryId);
    handleShow();
  };

  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('image', categoryImage);
      formData.append('name', categoryName);

      await axios.put(`http://localhost:5000/api/categories/${selectedCategoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Category updated successfully');
      handleClose();
      setCategoryName('');
      setCategoryImage(null);
      setSelectedCategoryId(null);

      // Additional logic after successful category update
    } catch (error) {
      console.error('Error updating category', error);
    }
  };


  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
      // Update state to remove the deleted category
      setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error('Error deleting category', error);
      toast.error("Error deleting category");
    }
  };




  return (
    <>
      <Sidebar />
      <div>
     
        <div className='lg:ml-[280px]'>
        <table className='lg:w-80 lg:mt-[100px] mt-[120px] ml-5'>
          <tr>
            <th>
              <h2 className='text-2xl'>Category</h2>
            </th>
            <th className='lg:float-right'>
              <button className='btn btn-success ml-[80px] lg:ml-0' onClick={handleShow}>Add Category</button>
            </th>
          </tr>
        </table>
        <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Category Name"
                      autoFocus
                      value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control type='file' onChange={handleImageChange} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button className='btn btn-danger' onClick={handleClose}>
                  Close
                </button>
                <button className='btn btn-success' onClick={handleSaveCategory} disabled={!categoryName || !categoryImage}>
                  Save Changes
                </button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* Edit Category */}

         
        
            <Table responsive striped hover className='lg:mt-[50px] mt-[50px]'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className='w-[100px]'>
                    <td>{category.name}</td>
                    <td>
                      <img src={`http://localhost:5000/Images/${category.image}`} alt={category.image} style={{ width: '50px', height: '50px' }} />
                    </td>
                    <td>
                      <Link to={`/admin/categoryupdate/${category._id}`}><button className='btn btn-warning mr-2' onClick={() => edithandleShow(category._id)}>Edit</button></Link>
                      <button className='btn btn-danger' onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>
          </div>
        <ToastContainer />
        </div>
     
    </>
  )
}

export default Category