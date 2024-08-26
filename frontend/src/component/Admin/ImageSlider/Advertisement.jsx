import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Advertisement() {
    const [show, setShow] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [couponData, setCouponData] = useState({
        title: '',
        description: '',
        code: '',
        discount: '',
        status: 'active' // Default status
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/coupons');
            setCoupons(response.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setCouponData({
            ...couponData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/addcoupon', couponData);
            toast.success("Coupon Saved");
            fetchCoupons(); // Fetch coupons again to update the list
            handleClose();
        } catch (error) {
            console.error('Error saving coupon:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deletecoupon/${id}`);
            toast.success("Coupon deleted");
            fetchCoupons(); // Fetch coupons again to update the list
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className='lg:ml-[260px]'>
                <div>
                    <button className='btn btn-success float-right m-5 ms:m-10' onClick={handleShow}>Add Coupon</button>
                </div>
                <div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Coupon</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Coupon Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Coupon Title"
                                        name="title"
                                        value={couponData.title}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Coupon Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Coupon Description"
                                        name="description"
                                        value={couponData.description}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="code">
                                    <Form.Label>Coupon Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Coupon Code"
                                        name="code"
                                        value={couponData.code}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="discount">
                                    <Form.Label>Coupon Discount Percentage</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Coupon Discount Percentage"
                                        name="discount"
                                        value={couponData.discount}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="status">
                                    <Form.Label>Coupon Status</Form.Label>
                                    <Form.Select name="status" value={couponData.status} onChange={handleChange}>
                                        <option value="active">Active</option>
                                        <option value="notactive">Not Active</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button className="btn btn-outline-success" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                
                <Table bordered hover className='lg:mt-[75px] mt-[150px] w-full'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Coupon Code</th>
                            <th>Amount Discount</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon, index) => (
                            <tr key={index}>
                                <td>{coupon.title}</td>
                                <td>{coupon.description}</td>
                                <td>{coupon.code}</td>
                                <td>{coupon.discount}</td>
                                <td>{coupon.status}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(coupon._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ToastContainer />
            
            </div>
          
        </div>
    );
}

export default Advertisement;
