import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email:formData.email,
    password:formData.password,
    confirmPassword:formData.password
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullname || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:3000/SignUp",
        {
          username: formData.fullname, 
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        alert("Registration successful! You can now sign in.");
        navigate("/signin");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.message || "User already exists");
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
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
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <h1>
          Welcome<br />
          we are glad you are here!
        </h1>
      </div>

      <div className="auth-side form-right">
        <div className="form-box">
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname"
              placeholder="Fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
            <p>
              Already have an account? <Link to="/signin">Log in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
