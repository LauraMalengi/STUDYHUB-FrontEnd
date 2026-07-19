// src/pages/SignIn.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./LogIn.css";

const LogIn = () => {

 const [credentials, setCredentials] = useState({
    email:"",
    password:""
});

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Client-side validation
  if (!credentials.email || !credentials.password) {
    setError("Email and password are required");
    return;
  }

  try {
    setIsLoading(true);
    
    await axios.post("http://localhost:3000/login",{
    email:credentials.email,
    password:credentials.password
});

    if(response.data.token){
      localStorage.setItem(
    "token",
    response.data.token
);
      
    } else {
      setError(response.data.message || 'Login failed');
    }
  } catch (err) {
    // Specific error handling
    if (err.response) {
      if (err.response.status === 400) {
        setError(err.response.data.message || 'Invalid request');
      } else if (err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Server error. Please try again later.');
      }
    } else if (err.request) {
      setError('Network error. Please check your connection.');
    } else {
      setError('An unexpected error occurred');
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div
        className="auth-side image-left"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          height: '100vh',
        }}
      >
        <h1>
          HI<br />
          Welcome back!!
        </h1>
      </div>

      <div className="auth-side form-right">
        <div className="form-box">
          <h2>LogIn</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              value={credentials.identifier}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
            <p>
              Don't have an account?{" "}
              <Link to="/signup">Sign up now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
