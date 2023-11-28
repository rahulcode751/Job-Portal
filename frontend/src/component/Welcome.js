import { Grid, Typography } from "@material-ui/core";
// import { useNavigate } from "react-router-dom";
import image from "../assets/image1.jpg";
import { useHistory } from "react-router-dom";

const Welcome = (props) => {
  return (
    <div className="wel-container">
      <div class="wel-text">
        <h1>Welcome to JOBS.io</h1>
        Your Job Search Made Easy
        <button class="wel-btn">Start applying now</button>
      </div>
      <div className="wel-img">
        <img src={image} alt="image " />
      </div>
    </div>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
