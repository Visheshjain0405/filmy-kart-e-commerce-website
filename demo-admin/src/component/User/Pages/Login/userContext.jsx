// import React, { createContext, useEffect, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   // Function to handle logout
//   const logout = () => {
//     // Clear the token from localStorage
//     localStorage.removeItem('token');
//     // Set the token state to null
//     setToken(null);
//   };

//   useEffect(() => {
//     // Check if a token exists in localStorage
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       // Set the token state to the stored token
//       setToken(storedToken);
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ token, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;
