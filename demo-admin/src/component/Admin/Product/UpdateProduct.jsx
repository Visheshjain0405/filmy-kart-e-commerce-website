import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProduct() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    movietype: '',
    status: '',
    producttype: '',
    category: '',
    celebrities: '',
    qty:'',
    images: [],
    sizes: [], // Added sizes state
  });

  useEffect(() => {
    // Fetch product data by ID and update state
    axios.get(`http://localhost:5000/api/singleproductfetch/${id}`)
      .then(response => {
        setProduct(response.data);
        // Set selected category based on product data
        setSelectedCategory(response.data.category);
        // Set sizes based on product data
        setProduct(prevState => ({
          ...prevState,
          sizes: response.data.sizes || [] // Ensure sizes are set, default to empty array if not available
        }));
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProduct(prevState => ({
      ...prevState,
      images: e.target.files // Set images directly from the input files
    }));
  };

  const handleCelebritiesChange = (e) => {
    const { value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      celebrities: value
    }));
  };

  const handleMovieTypeChange = (e) => {
    const { value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      movietype: value
    }));
  };

  const handleCheckboxChange = async (e) => {
    const { value, checked } = e.target;
    setProduct(prevState => {
      if (checked) {
        return {
          ...prevState,
          sizes: [...prevState.sizes, value]
        };
      } else {
        return {
          ...prevState,
          sizes: prevState.sizes.filter(size => size !== value)
        };
      }
    });

    try {
      // Update product sizes in the database
      const response = await axios.put(`http://localhost:5000/api/updateproduct/${id}`, {
        sizes: product.sizes
      });
      toast.success('Product sizes updated successfully');
    } catch (error) {
      console.error('Error updating product sizes:', error);
      toast.error('Failed to update product sizes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('movietype', product.movietype);
      formData.append('status', product.status);
      formData.append('producttype', product.producttype);
      formData.append('category', product.category);
      formData.append('celebrities', product.celebrities);
formData.append('qty',product.qty)
      // Append each selected size to form data
      product.sizes.forEach(size => {
        formData.append('sizes', size);
      });

      // Append each image to form data
      for (let i = 0; i < product.images.length; i++) {
        formData.append(`newImages`, product.images[i]);
      }

      // Make API request to update the product
      const response = await axios.put(`http://localhost:5000/api/updateproduct/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Product updated successfully');
      window.location.href="/product"
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };


  return (
    <div>
      <form className="max-w-sm mx-auto">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Name"
            name='name'
            value={product.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Description"
            name='description'
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Price"
            name='price'
            value={product.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Price"
            name='qty'
            value={product.qty}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Category</Form.Label>
          <Form.Select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option
                key={category._id}
                value={category.name}
                selected={category.name === selectedCategory}
              >
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Conditional rendering of size options based on selected category */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Sizes</Form.Label>
          {/* Render size options based on selected category */}
          {categories.map((category) => (
            selectedCategory === category.name && category.sizes ? (
              category.sizes.map((size) => (
                <Form.Check
                  key={size}
                  name="sizes"
                  value={size}
                  onChange={handleCheckboxChange}
                  label={size}
                  checked={product.sizes.includes(size)}
                />
              ))
            ) : null // Remove the block that renders the message here
          ))}
        </Form.Group>

        {/* Conditional rendering of size options based on selected category */}
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
            <p>Does not require size</p>
          )}
          {selectedCategory === 'Mug' && (
            <p>Does not require size</p>
          )}
          {selectedCategory === 'Badges' && (
            <p>Does not require size</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Celebrities</Form.Label>
          <Form.Select
            type="select"
            placeholder="Product Name"
            name='celebrities'
            value={product.celebrities}
            onChange={handleCelebritiesChange}
          >
            <option value={product.celebrities}>{product.celebrities}</option>
            <option>Open this select menu for celebrities</option>
            <option value="rajinikanth">Rajinikanth</option>
            <option value="maheshbabu">Mahesh Babu</option>
            <option value="thalapathyvijay">Thalapathy Vijay</option>
            <option value="ajithkumar">Ajith Kumar</option>
            <option value="dhanush">Dhanush</option>
            <option value="alluarjun">Allu Arjun</option>
            <option value="chiranjeevi">Chiranjeevi</option>
            <option value="notapplicable">Not Applicable</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Movie Type</Form.Label>
          <Form.Select
            type="select"
            placeholder="Product Name"
            name='movietype'
            value={product.movietype}
            onChange={handleMovieTypeChange}
          >
            <option value={product.movietype}>{product.movietype}</option>
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
            value={product.status}
            onChange={handleChange}
          >
            {product.status === true ? (
              <>
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </>
            ) : (
              <>
                <option value={false}>Not Available</option>
                <option value={true}>Available</option>
              </>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Type</Form.Label>
          <Form.Select
            type="select"
            placeholder="Product Name"
            name='producttype'
            value={product.producttype}
            onChange={handleChange}
          >
            <option value={product.producttype}>{product.producttype}</option>
            <option>Open this select menu for Status</option>
            <option value="trendingproduct">Trending Products</option>
            <option value="bestselling">Best Selling</option>
            <option value="toprated">Top Rated</option>
            <option value="notapplicable">Not Applicable</option>
          </Form.Select>
        </Form.Group>

        {/* Add other Form.Group components similarly */}
        <button
          type="submit"
          className="text-white bg-blue-700 btn btn-success hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateProduct;
