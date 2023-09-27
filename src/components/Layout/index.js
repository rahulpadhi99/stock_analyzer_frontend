import { useLocation, useNavigate } from "react-router";
import "./layout.css";

const Layout = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    navigate("/");
  };

  return (
    <div>
      <div className="layout-container">
        {!["/", "/login"]?.includes(pathname) && (
          <div className="header-container">
            <div>
              <button
                className="home-button"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </button>
            </div>
            <div>
              <button
                className="logout-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
export default Layout;
