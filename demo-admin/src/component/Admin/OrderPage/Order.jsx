import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import Product from '../Product/Product';
function Order() {

  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [ordersInProcess, setOrdersInProcess] = useState(0);
  const [ordersOutForDelivery, setOrdersOutForDelivery] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:5000/api/allorders')
      .then(response => {
        const ordersData = response.data;
        setOrders(ordersData);

        // Calculate total order count
        setTotalOrders(ordersData.length);

        // Calculate total pending orders
        const pendingOrdersCount = ordersData.filter(order => order.status === 'Pending').length;
        setPendingOrders(pendingOrdersCount);
        console.log(`pending orders- ${pendingOrdersCount}`)
        // Calculate total orders in process
        const ordersInProcessCount = ordersData.filter(order => order.status === 'inprocess').length;
        setOrdersInProcess(ordersInProcessCount);
        console.log(`in process order- ${ordersInProcessCount}`)
        // Calculate total orders out for delivery
        const ordersOutForDeliveryCount = ordersData.filter(order => order.status === 'outfordelivery').length;
        setOrdersOutForDelivery(ordersOutForDeliveryCount);
        console.log(`ordersOutForDeliveryCount- ${ordersOutForDeliveryCount}`)

        // Calculate total delivered orders
        const deliveredOrdersCount = ordersData.filter(order => order.status === 'delivered').length;
        setDeliveredOrders(deliveredOrdersCount);
        console.log(`Total delivered orders- ${deliveredOrdersCount}`)
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const sortedOrders = () => {
    const sorted = [...orders];
    sorted.sort((a, b) => {
      const fieldA = getField(a, sortBy);
      const fieldB = getField(b, sortBy);
      if (fieldA < fieldB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  };

  const getField = (obj, field) => {
    if (!obj || !field) return null;
    const fields = field.split('.');
    let result = obj;
    for (let i = 0; i < fields.length; i++) {
      result = result[fields[i]];
      if (result === undefined) return null;
    }
    return result;
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders().slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const generateOrderReport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/allorders');
      const orders = response.data;

      const tableRows = orders.map(order => (
        `<tr key="${order._id}">
          <td>${order.products.map(product => product.productName || 'No name').join('<br/>')}</td>
          <td>${order.orderDate}</td>
          <td>${order.status}</td>
        </tr>`
      )).join('');

      const tableStyle = `
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          title{
            margin-top:50px;
            margin-bottom:50px;
          }
        </style>
      `;

      const table = `
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Order Date</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;

      const htmlContent = `
        <html>
          <head>
            <title>Order Report</title>
            ${tableStyle}
          </head>
          <body>
            <h1>Order Report</h1>
            ${table}
          </body>
        </html>
      `;

      html2pdf().from(htmlContent).save();
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };



  return (
    <div>
      <Sidebar />
      <div className='lg:ml-[260px]'>

        <div className="container-fluid mt-8">
          {/* Page Heading */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Order</h1>
            <a
              href="#"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              onClick={generateOrderReport}
            >
              <i className="fas fa-download fa-sm text-white-50" /> Generate Report
            </a>

          </div>
          {/* Content Row */}
          <div className="row">
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Total Orders
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {totalOrders}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Total Pending Orders
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {pendingOrders}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clock fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Earnings (Monthly) Card Example */}
            {/* <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Tasks
                      </div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                            50%
                          </div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              style={{ width: "50%" }}
                              aria-valuenow={50}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Pending Requests Card Example */}
            {/* <PerDayOrderGraph data={perDayOrderData} /> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Total In Process Order
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {ordersInProcess}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-boxes-packing fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Total Delivered Order
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {deliveredOrders}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-truck fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Content Row */}






        </div>
        {/* <i className='fa-solid fa-sort' onClick={()=>{setSortBy('orderDate'); toggleSortOrder()}}></i> */}
        <div id="order-table-container">
          <Table responsive bordered hover className='lg:mt-[50px] mt-[50px]'>
            <thead>
              <tr>
                <th>Product Name</th>
                <th >Order Date </th>
                <th>Order Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td className='bg-red-500'>
                    {order.products.map(product => (
                      <li key={product._id} className='text-capitalize text-start'>{product.productName || 'No name'}</li>
                    ))}
                  </td>
                  <td>{order.orderDate}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link to={`/orderupdate/${order._id}`}>
                      <button className='btn btn-warning mr-2'>Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* Pagination */}
        <ul className="pagination ml-2 mb-5">
          {Array.from({ length: Math.ceil(sortedOrders().length / ordersPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Order