import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

function OrderUpdate() {
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [order, setOrder] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/singleorderpage/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/singleorderpage/${id}`, {
        status: status,
      });

      if (response.status === 200) {
        console.log('Order status updated successfully');
        setIsUpdated(true);
      } else {
        console.error('Failed to update order status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (isUpdated) {
    return <Navigate to="/order" replace />;
  }

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: 15 }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center lg:text-4xl">Edit Order Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.products && order.products.map(product => (
                      <div key={product._id} className="border border-gray-300 rounded p-4">
                        <h3 className="text-lg font-semibold">{product.productName}</h3>
                        <p>Quantity: {product.qty}</p>
                        <p>Price: {product.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block mb-2">Order Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded">
                      <option value="pending">Pending</option>
                      <option value="inprocess">In Process</option>
                      <option value="outfordelivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <button onClick={handleUpdateStatus} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderUpdate;
