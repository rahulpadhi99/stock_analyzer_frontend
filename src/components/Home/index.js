import { Button } from "@mui/material";
import "./home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <Button
        className="myprofile-button button"
        onClick={() => {
          navigate("/my-profile");
        }}
      >
        My Profile
      </Button>
      <Button
        className="watchlist-button button"
        onClick={() => {
          navigate("/watchlist");
        }}
      >
        Watchlist
      </Button>
      <Button
        className="search-button button"
        onClick={() => {
          navigate("/search");
        }}
      >
        Search
      </Button>
      <Button
        className="journal-button button"
        onClick={() => {
          navigate("/journal");
        }}
      >
        Journal
      </Button>
    </div>
  );
};

export default Home;
