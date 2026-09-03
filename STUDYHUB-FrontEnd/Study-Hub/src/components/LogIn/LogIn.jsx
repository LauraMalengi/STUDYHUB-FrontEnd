import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.css";
import google from "../../assets/Google.png"
import facebook from "../../assets/Facebook.png"

function Login() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

         console.log(formData);

        try {

            const response = await fetch("http://localhost:3000/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)

            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);

                alert("LogIn Successful!");

                navigate("/home");

            } else {

                setMessage(data.message);

            }

        } catch (error) {

            setMessage("Server Error");

        }

    }

    return (

        <div className="login-page">

            <div className="overlay">

                <div className="login-card">

                    <h1>Welcome StudyHub</h1>

                    <p className="subtitle">
                        Log in to continue
                    </p>

                    <form onSubmit={handleSubmit}>

                        <label>
                            *Username
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Type your username or Email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            *Password
                        </label>

                        <div className="password-container">

    <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Type your password"
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
                        <div className="forgot-password">

                            <a href="#">
                                Forgot password?
                            </a>

                        </div>

                        <button
                            className="login-btn"
                            type="submit"
                        >
                            Log In
                        </button>

                    </form>

                    {message &&

                        <p className="error">
                            {message}
                        </p>

                    }

                    <div className="signup-link">

                        Don't have account?

                        <Link to="/signup">
                            Sign Up
                        </Link>

                    </div>

                    <div className="divider">

                        <span>Or With</span>

                    </div>

                    <button className="google-btn">
                    <img src={google} alt="Google" />
                        Sign in with your Google
                    </button>

                    <button className="facebook-btn">
                    <img src={facebook} alt="Facebook" />
                        Sign in with your Facebook
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Login;