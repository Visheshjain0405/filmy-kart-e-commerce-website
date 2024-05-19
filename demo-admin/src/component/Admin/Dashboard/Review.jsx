import React,{useState,useEffect} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import DailySalesGraph from './DailySalesGraph';
function Review() {
  const [reviews, setReviews] = useState([]);
 const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);
  return (
    <div>
        <Sidebar/>
        <div>
        <div className='lg:ml-[260px]'>
      <h1 className='text-2xl mt-5'>Product Reviews</h1>
      <Table responsive bordered className="mr-5">
        <thead>
          <tr>
            {/* <th>Product ID</th> */}
            <th>Review</th>
            <th>Rating</th>
            <th>Reviewer Name</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review._id}>
              {/* <td>{review.productId}</td> */}
              <td>{review.review}</td>
              <td>{review.rating}</td>
              <td>{review.fullname}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
        </div>
    </div>
  )
}

export default Review