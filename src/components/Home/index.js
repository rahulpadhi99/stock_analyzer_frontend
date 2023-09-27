import "./home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <button
        className="myprofile-button"
        onClick={() => {
          navigate("/my-profile");
        }}
      >
        My Profile
      </button>
      <button
        className="watchlist-button"
        onClick={() => {
          navigate("/watchlist");
        }}
      >
        Watchlist
      </button>
      <button
        className="search-button"
        onClick={() => {
          navigate("/search");
        }}
      >
        Search
      </button>
      <button
        className="journal-button"
        onClick={() => {
          navigate("/journal");
        }}
      >
        Journal
      </button>
    </div>
  );
};

export default Home;
