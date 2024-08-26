import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const generateData = (data) => {
  const dailySales = data.reduce((acc, order) => {
    const orderDate = new Date(order.orderDate);
    const formattedDate = orderDate.toLocaleDateString('en-CA');
    if (!acc[formattedDate]) {
      acc[formattedDate] = {
        name: formattedDate,
        sales: 0,
      };
    }
    order.products.forEach(product => {
      acc[formattedDate].sales += product.qty * product.price;
    });
    return acc;
  }, {});
  return Object.values(dailySales);
};

const DailySalesGraph = ({ orders }) => {
  const [graphWidth, setGraphWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth * 0.6; // You can adjust this percentage according to your requirement
      setGraphWidth(newWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = generateData(orders);

  return (
    <LineChart width={graphWidth} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
    </LineChart>
  );
};

export default DailySalesGraph;