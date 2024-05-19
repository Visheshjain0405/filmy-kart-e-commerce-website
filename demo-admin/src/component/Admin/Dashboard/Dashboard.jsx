import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import "./Dashboard.css"
import axios from 'axios';
import PerDayOrderGraph from './PerDayOrderGraph';
// import { Line } from 'react-chartjs-2';
import html2pdf from 'html2pdf.js';
import DailySalesGraph from './DailySalesGraph';
function Dashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [perDayOrderData, setPerDayOrderData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [totalsales, setTotalSales] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrders = await axios.get('http://localhost:5000/api/allorders');
        setOrders(fetchedOrders.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allorders");
        const orders = response.data;
        console.log(orders)
        // Calculate order count for today
        setOrderCount(orders.length);

        // Organize order data by day
        const ordersByDay = groupOrdersByDay(orders);
        setPerDayOrderData(ordersByDay);

        // Set order data
        setOrderData(orders); // Add this line

        let totalSales = 0;
        orders.forEach(order => {
          order.products.forEach(product => {
            totalSales += product.price * product.qty;
          });
        });
        setTotalSales(totalSales);


      } catch (error) {
        console.error('Error Fetching order', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allorders");
        const recentOrdersData = response.data;
        const lastFiveOrders = recentOrdersData.slice(-5);
        setRecentOrders(lastFiveOrders);
        // console.log(recentOrdersData)
      } catch (error) {
        console.error('Error fetching recent orders', error);
      }
    };

    fetchRecentOrders();
  }, []);


  const generateReport = () => {
    const element = document.getElementById('report-container'); // Replace 'report-container' with the ID of the container holding your report content
    html2pdf(element);
  };


  // // Function to group orders by day
  // const groupOrdersByDay = (orders) => {
  //   const groupedOrders = {};

  //   orders.forEach(order => {
  //     if (order.orderDate) {
  //       const date = order.orderDate.split('T')[0]; // Extracting date from orderDate field
  //       if (groupedOrders[date]) {
  //         groupedOrders[date]++;
  //       } else {
  //         groupedOrders[date] = 1;
  //       }
  //     }
  //   });

  //   // Convert object to array of objects
  //   const perDayData = Object.keys(groupedOrders).map(date => ({
  //     date,
  //     orders: groupedOrders[date]
  //   }));

  //   return perDayData;
  // };


  // const chartData = {
  //   labels: orderData.map(order => order.orderDate),
  //   datasets: [
  //     {
  //       label: 'Total Sales',
  //       data: orderData.map(order => order.totalPrice),
  //       fill: false,
  //       backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       borderWidth: 1
  //     }
  //   ]
  // };

  // const totalSalesAmount = orderData.reduce((total, order) => total + order.totalPrice, 0);

  const groupOrdersByDay = (orders) => {
    const groupedOrders = {};

    orders.forEach(order => {
      if (order.orderDate) {
        const date = order.orderDate.split('T')[0]; // Extracting date from orderDate field
        if (groupedOrders[date]) {
          groupedOrders[date].orderCount++;
          groupedOrders[date].totalSales += order.totalPrice;
        } else {
          groupedOrders[date] = {
            orderCount: 1,
            totalSales: order.totalPrice
          };
        }
      }
    });

    // Convert object to array of objects
    const perDayData = Object.keys(groupedOrders).map(date => ({
      date,
      orders: groupedOrders[date].orderCount,
      totalSales: groupedOrders[date].totalSales
    }));

    return perDayData;
  };

  // Update chart data to use the new data structure
  const chartData = {
    labels: perDayOrderData.map(data => data.date),
    datasets: [
      {
        label: 'Total Sales',
        data: perDayOrderData.map(data => data.totalSales),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };


  // Total sales amount calculation (sum of all sales)
  const totalSalesAmount = orderData.reduce((total, order) => total + order.totalPrice, 0);


  return (
    <div>
      <Sidebar />
      <div className='lg:ml-[260px] mt-[50px]'>
        <div className="container-fluid">
          {/* Page Heading */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            <a
              href="#"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              onClick={generateReport}
            >
              <i className="fas fa-download fa-sm text-white-50" /> Generate Report
            </a>

          </div>
          {/* Content Row */}
          <div id="report-container">
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
                          {orderCount}
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
                          TOTAL EARNINGS
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          ₹ {totalsales}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            {/* Content Row */}
            <div className="row">
              {/* Area Chart */}
              <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4 w-100">
                  {/* Card Header - Dropdown */}
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between w-full">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Orders Summary
                    </h6>
                  </div>
                  {/* Card Body */}
                  <div className="card-body">
                    <div className="chart-area w-full">
                      <PerDayOrderGraph data={perDayOrderData} />

                    </div>
                  </div>
                </div>
              </div>
              {/* Pie Chart */}

            </div>

            <div>
              {/* <h1>Total Sales</h1>
            {orderData.length > 0 && (
              <div>
                <Line data={chartData} />
              </div>
            )} */}
              <div className="row">
                {/* Area Chart */}
                <div className="col-xl-8 col-lg-7 w-100">
                  <div className="card shadow mb-4">
                    {/* Card Header - Dropdown */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between w-full">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Daily Sales Graph
                      </h6>
                    </div>
                    {/* Card Body */}
                    <div className="card-body">
                      <div className="chart-area">

                        <DailySalesGraph orders={orders} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pie Chart */}

              </div>

            </div>

            <div className=" mt-5">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between w-full">
                  <h6 className="m-0 font-weight-bold text-primary">Recent Orders</h6>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {recentOrders.map((order, index) => (
                      <li key={index} className="list-group-item">
                        <div className="row">
                          <div className="col">
                            {order.products.map(product => (
                              <li key={product._id}>
                                <tr>{product.productName || 'No name'}</tr>
                                {/* Add more product details as needed */}
                              </li>
                            ))}
                          </div>
                          <div className="col">{order.orderDate}</div>
                          <div className="col">{order.status}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Content Row */}

        </div>

      </div>

    </div>
  )
}

export default Dashboard