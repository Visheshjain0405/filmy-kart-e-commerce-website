import React,{useState,useEffect} from "react"
import axios from "axios";
import Navbar from "../../Home/Navbar/Navbar";
function Supercoin() {
  const [availablePoints, setAvailablePoints] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
      // Retrieve user data from local storage
      const userData = localStorage.getItem('user');

      // If user data is not available, redirect the user to the login page
      // Parse user data from JSON format
      const parsedUserData = JSON.parse(userData);
      console.log("User Data:", userData);
      // Log userId and fullname separately
      const { _id: userId } = parsedUserData;
      console.log("UserId:", userId);
      setUserId(userId);
  }, []);

  console.log(`User Id: ${userId}`);

  useEffect(() => {
      const fetchAvailablePoints = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/api/getAvailablePoints/${userId}`);
              console.log("Response:", response.data); // Log the response data for debugging
              const { availablePoints } = response.data;
              setAvailablePoints(availablePoints);
              console.log("Available Points:", availablePoints);
          } catch (error) {
              console.error('Error fetching available points:', error);
          }
      };

      if (userId) {
          fetchAvailablePoints();
      }
  }, [userId]);

  return (
      <div>
          <Navbar />
          <div className="mt-[250px]">
          <h1 className="text-center">You have total super coins: {availablePoints}</h1>
          </div>
      </div>
  );
}

export default Supercoin;
