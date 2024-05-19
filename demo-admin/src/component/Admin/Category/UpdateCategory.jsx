import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import Category from './Category';

function UpdateCategory() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/categories/${id}`, {
        newName: categoryName,
        image: selectedImage,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating category:', error.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/singlefetchcategories/${id}`);
        setProductDetails(response.data);
        setCategoryName(response.data.name);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, [id]);
  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Edit Categories Details</h3>
                  {/* <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={productDetails.name}
                          />
                          <label className="form-label" htmlFor="firstName">
                            Category Name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <img
                            src={selectedImage || `http://localhost:5000/Images/${productDetails.image}`}
                            alt={productDetails.name}
                            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                            onClick={handleImageClick}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4"></div>
                      <div className="col-md-6 mb-4">
                        <button className="btn btn-danger mr-5">Cancel</button>
                        <button className="btn btn-success" onClick={updateCategory}>
                          Update Category
                        </button>
                      </div>
                    </div>
                  </form> */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="firstName">
                          Category Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <img
                          src={selectedImage || `http://localhost:5000/Images/${productDetails.image}`}
                          alt={productDetails.name}
                          style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                          onClick={handleImageClick}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* ... Other form fields ... */}
                  <div className="row">
                    <div className="col-md-6 mb-4"></div>
                    <div className="col-md-6 mb-4">
                      <button className="btn btn-danger mr-5">Cancel</button>
                      <button className="btn btn-success" onClick={handleUpdate}>
                        Update Category
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
}

export default UpdateCategory;
