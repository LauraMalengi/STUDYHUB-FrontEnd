import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">

    <video
  autoPlay
  muted
  loop
  playsInline
  className="background-video"
>
  <source src="/videos/intro.mp4" type="video/mp4" />
</video>

      <div className="overlay">
        <h1>Welcome to STUDYHUB</h1>

        <button onClick={() => navigate("/signin")}>
          Get Started
        </button>
      </div>

    </div>
  );
}

export default LandingPage;