// // CategoryForm.js
// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const CategoryForm = ({ showModal, handleClose, handleSave }) => {
//     const [categoryName, setCategoryName] = useState('');
//     const [categoryImage, setCategoryImage] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Validate and save data to MongoDB or perform other actions
//         handleSave({ categoryName, categoryImage });
//         handleClose();
//     };

//     return (
//         <Modal show={showModal} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add Category</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="categoryName">
//                         <Form.Label>Category Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter category name"
//                             value={categoryName}
//                             onChange={(e) => setCategoryName(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="categoryImage">
//                         <Form.Label>Category Image URL</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter category image URL"
//                             value={categoryImage}
//                             onChange={(e) => setCategoryImage(e.target.value)}
//                         />
//                     </Form.Group>

//                     <button className='btn btn-success mt-5'>Save</button>

//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default CategoryForm;
