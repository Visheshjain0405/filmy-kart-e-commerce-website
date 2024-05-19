import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function Product() {

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState([])
  // const [products, setProducts] = useState([])
  // const [trendingProduct, setTrendingProduct] = useState(false);
  // const [product, setProduct] = useState({
  //   name: '',
  //   description: '',
  //   price: '',
  //   qty: '',
  //   sizes: [],
  //   status: 'available',
  //   images: [],
  //   category: '',
  //   trendingProduct: 'true',
  // });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    qty: '',
    category: '',
    images: [],
    sizes: [],
    description: '',
    status: '',
    producttype: '',
    movietype: '',
    celebrities: '',
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProduct({ ...product, [name]: value });
  // };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setProduct({ ...product, images: files });
  // };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({
      ...formData,
      images: Array.from(files),
    });
  };

  const handleCheckboxChange = (e) => {
    const selectedSizes = e.target.checked
      ? [...formData.sizes, e.target.value]
      : formData.sizes.filter((size) => size !== e.target.value);

    setFormData({ ...formData, sizes: selectedSizes });
  };
  // const handleCategoryChange = (e) => {
  //   setSelectedCategory(e.target.value);
  // };

  // const handleTrendingProductChange = () => {
  //   setTrendingProduct((prevTrendingProduct) => !prevTrendingProduct);
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Logic
    if (!formData.name || !formData.price || !formData.qty || !selectedCategory || formData.images.length === 0) {
      // Display toast message for validation error
      toast.error("Please fill in all the required fields and select a category");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('qty', formData.qty);
    formDataToSend.append('category', selectedCategory);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('producttype', formData.producttype)
    formDataToSend.append('movietype', formData.movietype);
    formDataToSend.append('celebrities', formData.celebrities);

    formData.sizes.forEach((size) => {
      formDataToSend.append('sizes', size);
    });

    formData.images.forEach((image, index) => {
      formDataToSend.append('images', image); // Use the same key for all images
    });

    try {
      // Send the form data to the server
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product saved successfully:', data);
        // Display success toast message
        toast.success("Product Added Successfully");

        handleClose();

        setFormData({
          name: '',
          price: '',
          qty: '',
          category: '',
          images: [],
          sizes: [],
          description: '',
          status: '',
          producttype: '',
          movietype: '',
          celebrities: '',
        });

        // Reload the page
        window.location.reload();
        // Handle success or navigate to another page
      } else {
        console.error('Error saving product:', response.statusText);
        // Display error toast message
        toast.error("Error saving product");
      }
    } catch (error) {
      console.error('Error saving product:', error);
      // Display error toast message
      toast.error("Error saving product");
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formDataToSend = new FormData();
  //   formDataToSend.append('name', formData.name);
  //   formDataToSend.append('price', formData.price);
  //   formDataToSend.append('qty', formData.qty);
  //   formDataToSend.append('category', selectedCategory);
  //   formDataToSend.append('status',formData.status);
  //   formDataToSend.append('description',formData.description);
  //   formDataToSend.append('producttype',formData.producttype)
  //   formDataToSend.append('movietype',formData.movietype);
  //   formDataToSend.append('celebrities',formData.celebrities);

  //   formData.sizes.forEach((size) => {
  //     formDataToSend.append('sizes', size);
  //   });

  //   formData.images.forEach((image, index) => {
  //     formDataToSend.append('images', image); // Use the same key for all images
  //   });

  //   try {
  //     // Send the form data to the server
  //     const response = await fetch('http://localhost:5000/api/products', {
  //       method: 'POST',
  //       body: formDataToSend,
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Product saved successfully:', data);
  //       toast.success("Product Added Successfully");
  //       handleClose();
  //       // Handle success or navigate to another page
  //     } else {
  //       console.error('Error saving product:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error saving product:', error);
  //   }
  // };

  useEffect(() => {
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




  const handleDeleteCategory = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      // Update state to remove the deleted category
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error('Error deleting category', error);
      toast.error("Error deleting category");
    }
  };


  useEffect(() => {
    // Fetch categories from the server when the component mounts
    const fetchproducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchproducts();
  }, []);


  // const handleTableChange = (type, { page, sizePerPage }) => {
  //   setCurrentPage(page);
  //   setSizePerPage(sizePerPage);
  // };

  // const columns = [
  //   { dataField: 'name', text: 'Name', sort: true },
  //   { dataField: 'images', text: 'Image', formatter: (cell, row) => <img src={`http://localhost:5000/Images/${cell[0]}`} alt={row.image} style={{ width: '50px', height: '50px' }} /> },
  //   {dataField:'qty',text:'Quantity',sort:true},
  //   {
  //     dataField: 'edit', text: 'Edit', formatter: (cell, row) => (
  //       <Link to={`/productupdate/${row._id}`}>
  //         <button className='btn btn-warning mr-2'>Edit</button>
  //       </Link>
  //     )
  //   },
  //   {
  //     dataField: 'delete',
  //     text: 'Delete',
  //     formatter: (cell, row) => (
  //       <button className='btn btn-danger' onClick={() => handleDeleteCategory(row._id)}>Delete</button>
  //     )
  //   }
  // ];


  return (
    <div>
      <Sidebar />
      <div className='lg:ml-[270px]'>
        <>
          <button className='btn btn-success mt-8 mb-5' onClick={handleShow}>
            Add Product
          </button>
          <input type="text" placeholder='search' className='p-2 float-end mt-8 mr-5'/>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    name="name" value={formData.name} onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Product Price"
                    name="price" value={formData.price} onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Product Stock"
                    name="qty" value={formData.qty} onChange={handleChange}
                  />
                </Form.Group>
               
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Images</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Product Name"
                    name="images" multiple onChange={handleImageChange}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Status</Form.Label>
                  <Form.Select
                    type="select"
                    placeholder="Product Name"
                    name='status'
                    value={product.status}
                    onChange={handleInputChange}
                  >
                    <option>Open this select menu for Status</option>
                    <option value="Avialable">Avialable</option>
                    <option value="Not Avialable">Not Avialable</option>
                  </Form.Select>
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Sizes</Form.Label>
                  {selectedCategory === 'T-Shirt' && (
                    <>
                      <Form.Check name="sizes" value="S" onChange={handleCheckboxChange} label="S" />
                      <Form.Check name="sizes" value="M" onChange={handleCheckboxChange} label="M" />
                      <Form.Check name="sizes" value="L" onChange={handleCheckboxChange} label="L" />
                      <Form.Check name="sizes" value="XL" onChange={handleCheckboxChange} label="XL" />
                      <Form.Check name="sizes" value="XXL" onChange={handleCheckboxChange} label="XXL" />
                    </>
                  )}
                   {selectedCategory === 'Hoodies' && (
                    <>
                      <Form.Check name="sizes" value="S" onChange={handleCheckboxChange} label="S" />
                      <Form.Check name="sizes" value="M" onChange={handleCheckboxChange} label="M" />
                      <Form.Check name="sizes" value="L" onChange={handleCheckboxChange} label="L" />
                      <Form.Check name="sizes" value="XL" onChange={handleCheckboxChange} label="XL" />
                      <Form.Check name="sizes" value="XXL" onChange={handleCheckboxChange} label="XXL" />
                    </>
                  )}
                  {selectedCategory === 'Posters' && (
                    <>
                      <Form.Check name="sizes" value="A3" onChange={handleCheckboxChange} label="A3" />
                      <Form.Check name="sizes" value="A4" onChange={handleCheckboxChange} label="A4" />
                    </>
                  )}
                  {selectedCategory === 'mobile-cases' && (
                    <p>Does not required size</p>
                  )}
                  {selectedCategory === 'Mug' && (
                    <p>Does not required size</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Celebrities</Form.Label>
                  <Form.Select
                    type="select"
                    placeholder="Product Name"
                    name='celebrities'
                    value={formData.celebrities}
                    onChange={handleChange}
                  >
                    <option>Open this select menu for celebrities</option>
                    <option value="rajinikanth">Rajinikanth</option>
                    <option value="maheshbabu">Mahesh Babu</option>
                    <option value="thalapathyvijay">Thalapathy Vijay</option>
                    <option value="ajithkumar">Ajith Kumar</option>
                    <option value="dhanush">Dhanush</option>
                    <option value="alluarjun">Allu Arjun</option>
                    <option value="chiranjeevi">Chiranjeevi</option>
                    <option value="prabhas">Prabhas</option>
                    <option value="notapplicable">Not Applicable</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Movie Type</Form.Label>
                  <Form.Select
                    type="select"
                    placeholder="Product Name"
                    name='movietype'
                    value={formData.movietype}
                    onChange={handleChange}
                  >
                    <option>Open this select menu for Status</option>
                    <option value="leo">Leo</option>
                    <option value="vikram">Vikram</option>
                    <option value="salaar">Salaar</option>
                    <option value="rrr">RRR</option>
                    <option value="hanuman">Hanuman</option>
                    <option value="maaveeran">Maaveeran</option>
                    <option value="bahubali">Bahubali</option>
                    <option value="adipurush">Adipurush</option>
                    <option value="ps2">Ponniyen Selvan - 2</option>
                    <option value="notapplicable">Not Applicable</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Status</Form.Label>
                  <Form.Select
                    type="select"
                    placeholder="Product Name"
                    name='status'
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Open this select menu for Status</option>
                    <option value="true">Avialable</option>
                    <option value="false">Not Avialable</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Product Type</Form.Label>
                  <Form.Select
                    type="select"
                    placeholder="Product Name"
                    name='producttype'
                    value={formData.producttype}
                    onChange={handleChange}
                  >
                    <option>Open this select menu for Status</option>
                    <option value="trendingproduct">Trending Products</option>
                    <option value="bestselling">Best Selling</option>
                    <option value="toprated">Top Rated</option>
                    <option value="notapplicable">Not Applicable</option>
                  </Form.Select>
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button className="btn btn-success" onClick={handleSubmit} >
                Add Product
              </button>
            </Modal.Footer>
          </Modal>
        </>

        {/* Edit Product Model */}



        {/* <Table responsive striped hover className='lg:mt-[50px] mt-[50px]'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className='w-[100px]'>
                <td>{product.name}</td>
                <td>
                  <img src={`http://localhost:5000/Images/${product.images[0]}`} alt={product.image} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>
                  <Link to={`/productupdate/${product._id}`}> <button className='btn btn-warning mr-2' onClick={() => handleShow(product._id)}>Edit</button></Link>
                  <button className='btn btn-danger' onClick={() => handleDeleteCategory(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </Table> */}

        {/* <BootstrapTable
          keyField='_id'
          data={products}
          columns={columns}
          pagination={paginationFactory({
            page: currentPage,
            sizePerPage: sizePerPage,
            totalSize: products.length,
            onPageChange: (page, sizePerPage) => handleTableChange('pagination', { page, sizePerPage }),
            onSizePerPageChange: (sizePerPage, page) => handleTableChange('pagination', { page, sizePerPage })
          })}
        /> */}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Product