import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PerDayOrderGraph = ({ data }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    renderChart(data);
  }, [data]);

  const renderChart = (data) => {
    if (!canvasRef.current || !data || data.length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.date),
        datasets: [{
          label: 'Orders',
          data: data.map(item => item.orders),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  const resizeChart = () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.resize();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeChart);
    return () => {
      window.removeEventListener('resize', resizeChart);
    };
  }, []);


  return <canvas ref={canvasRef} id="perDayOrderChart" width="300" height="100"></canvas>;
};

export default PerDayOrderGraph;
