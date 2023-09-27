import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import "../src/global.css";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import MyProfile from "./components/MyProfile";
import Search from "./components/Search";
import Journal from "./components/Journal";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
