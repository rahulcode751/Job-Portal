import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./styles/Navbar.css";
import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "darkorange",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          className={classes.title}
          style={{ fontFamily: "inherit" }}
        >
          JOBS.io
        </Typography>
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Button
                style={{ borderBottom: "2px solid white" }}
                color="inherit"
                className="nav-btn"
                onClick={() => handleClick("/home")}
              >
                Home
              </Button>
              <Button
                style={{ borderBottom: "2px solid white" }}
                className="nav-btn"
                color="inherit"
                onClick={() => handleClick("/addjob")}
              >
                Jobs
              </Button>
              <Button
                style={{ borderBottom: "2px solid white" }}
                className="nav-btn"
                color="inherit"
                onClick={() => handleClick("/myjobs")}
              >
                My Jobs
              </Button>
              <Button
                style={{ borderBottom: "2px solid white" }}
                className="nav-btn"
                color="inherit"
                onClick={() => handleClick("/employees")}
              >
                Employees
              </Button>
              <Button
                style={{ borderBottom: "2px solid white" }}
                className="nav-btn"
                color="inherit"
                onClick={() => handleClick("/profile")}
              >
                Profile
              </Button>
              <Button
                style={{ borderBottom: "2px solid white" }}
                className="nav-btn"
                color="inherit"
                onClick={() => handleClick("/logout")}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{ borderBottom: "2px solid white" }}
                className="nav-btn"
                color="inherit"
                onClick={() => handleClick("/home")}
              >
                Home
              </Button>
              <Button
                style={{ borderBottom: "2px solid white" }}
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                About us
              </Button>
              <Button
                style={{ borderBottom: "2px solid white" }}
                color="inherit"
                onClick={() => handleClick("/profile")}
              >
                Profile
              </Button>
              <Button
                style={{ borderBottom: "2px solid white" }}
                color="inherit"
                onClick={() => handleClick("/logout")}
              >
                Logout
              </Button>
            </>
          )
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
