import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <h1>STAR WARS STARSHIPS</h1>
        <Link to="/starships" className="cta-button">
          START
        </Link>
      </div>
    </div>
  );
}
