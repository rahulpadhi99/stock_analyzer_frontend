import { useLocation, useNavigate } from "react-router";
import "./layout.css";
import { Box, Button } from "@mui/material";

const Layout = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box>
      <Box className="layout-container">
        {!["/", "/login"]?.includes(pathname) && (
          <Box className="header-container">
            <Box>
              <Button
                className="button"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </Button>
            </Box>
            <Box>
              <Button className="button" onClick={logoutHandler}>
                Logout
              </Button>
            </Box>
          </Box>
        )}
        {children}
      </Box>
    </Box>
  );
};
export default Layout;
