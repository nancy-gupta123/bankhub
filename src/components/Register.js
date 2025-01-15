import { useEffect, useState } from "react";
import { register } from "../services/authService";

import { useNavigate } from 'react-router-dom';
import image from '../utils/30456.jpg';



const Register = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pinCode: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const loadPage = setTimeout(() => {
      setIsLoading(false); 
    }, 3000); 
  
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      pinCode: "",
      email:"",
    }));
    
    return () => clearTimeout(loadPage);
  },
     []);
  // useEffect(() => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     pinCode: "",
  //     email:"",
  //   }));
  // }, []);

  


  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   pinCode: "",
    //   email: "",
    // }));
  };
    
  



 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await register(formData);
      
      //console.log(accountnumber)
      setMessage("Registration successful! Please login.");
      localStorage.setItem("accountnumber",response.accountNumber)
      
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage("Error: " + error.response.data.message);
      } else {
        setMessage("Error: Unable to connect to the server.");
      }
    }
  };
  


  if (isLoading) {
    
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        
        color: 'white',
        fontSize: '20px',
      }}>
         <iframe src="https://lottie.host/embed/569fbf3f-881a-445a-9ca0-639ae1e52343/oWvIeYkhVT.lottie"></iframe>
      </div>
    );
  }
  
  return (
    
    <div style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      
      <div style={{
      padding: "30px",
      backgroundColor: "#1A1A1D",
      paddingTop:"10px",
      marginTop:"100px",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
    }} className="bg-gray-900">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }} className="text-3xl font-bold text-white">Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
        <input className="bg-white "
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        </div>
        <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
        <input
          type="password"
          name="pinCode"
          placeholder="Pin Code"
          value={formData.pinCode}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        </div>
        <div style={{ marginBottom: "15px" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        /></div>
        <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        </div>
        <button type="submit"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#3B1C32",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }} >Register</button>
      </form>
      {message && <p style={{ marginTop: "15px", textAlign: "center", color: "green" }}>{message}</p>}
      </div>
      
    </div>
  );
};

export default Register;
