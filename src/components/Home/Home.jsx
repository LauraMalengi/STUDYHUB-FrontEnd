import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>Welcome to StudyHub</h1>

            <p>You are successfully logged in.</p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Home;