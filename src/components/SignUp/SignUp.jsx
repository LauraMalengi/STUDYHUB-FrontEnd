import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"
import google from "../../assets/Google.png"
import facebook from "../../assets/Facebook.png"

function SignUp() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "buyer"
    });

    const [message, setMessage] = useState("");

    function handleChange(event) {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            setMessage("Passwords do not match");

            return;
        }

        try {

            const response = await fetch("http://localhost:3000/signup", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)

            });

            const data = await response.json();

            if (response.ok) {

                alert("Account Created Successfully!");

                navigate("/signin");

            } else {

                setMessage(data.message);

            }

        } catch (error) {

            setMessage("Server Error");

        }

    }

    return (

        <div className="signup-page">

            <div className="overlay">

                <div className="signup-card">

                    <h1>Welcome to StudyHub</h1>

                    <p className="subtitle">
                        Please Sign up to continue
                    </p>

                    <form onSubmit={handleSubmit}>

                        <label>*Full Name</label>

                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />

                        <label>*Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>*Create Password</label>

                       <div className="password-container">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
  />

  <button
    type="button"
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

                        <label>*Confirm Password</label>

                        <div className="password-container">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChange={handleChange}
    required
  />

  <button
    type="button"
    className="toggle-password"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? "Hide" : "Show"}
  </button>
</div>

                        <div className="role-buttons">

                            <button
                                type="button"
                                className={formData.role === "seller" ? "active" : ""}
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        role: "seller"
                                    })
                                }
                            >
                                Seller
                            </button>

                            <button
                                type="button"
                                className={formData.role === "buyer" ? "active" : ""}
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        role: "buyer"
                                    })
                                }
                            >
                                Buyer
                            </button>

                        </div>

                        <button
                            className="signup-btn"
                            type="submit"
                        >
                            Create Account
                        </button>

                    </form>

                    {message &&
                        <p className="error">{message}</p>
                    }

                    <div className="login-link">

                        Already have an account?

                        <Link to="/signin">
                            LogIn
                        </Link>

                    </div>

                    <div className="divider">

                        <span>Or With</span>

                    </div>

                    <button className="google-btn">
                    <img src={google} alt="Google" />
                        Sign up with Google
                    </button>

                    <button className="facebook-btn">
                        <img src={facebook} alt="Facebook" />
                        Sign up with Facebook
                    </button>

                </div>

            </div>

        </div>

    );

}

export default SignUp;