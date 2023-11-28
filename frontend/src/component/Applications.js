// import { useState, useEffect, useContext } from "react";
// import {
//   Button,
//   Chip,
//   Grid,
//   IconButton,
//   InputAdornment,
//   makeStyles,
//   Paper,
//   TextField,
//   Typography,
//   Modal,
//   Slider,
//   FormControlLabel,
//   FormGroup,
//   MenuItem,
//   Checkbox,
// } from "@material-ui/core";
// import Rating from "@material-ui/lab/Rating";
// import axios from "axios";

// import { SetPopupContext } from "../App";

// import apiList from "../lib/apiList";

// const useStyles = makeStyles((theme) => ({
//   body: {
//     height: "inherit",
//   },
//   statusBlock: {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     textTransform: "uppercase",
//   },
//   jobTileOuter: {
//     padding: "30px",
//     margin: "20px 0",
//     boxSizing: "border-box",
//     width: "100%",
//   },
//   popupDialog: {
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// }));

// const ApplicationTile = (props) => {
//   const classes = useStyles();
//   const { application } = props;
//   const setPopup = useContext(SetPopupContext);
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(application.job.rating);

//   const appliedOn = new Date(application.dateOfApplication);
//   const joinedOn = new Date(application.dateOfJoining);

//   const fetchRating = () => {
//     axios
//       .get(`${apiList.rating}?id=${application.job._id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         setRating(response.data.rating);
//         console.log(response.data);
//       })
//       .catch((err) => {
//         // console.log(err.response);
//         console.log(err.response.data);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: "Error",
//         });
//       });
//   };

//   const changeRating = () => {
//     axios
//       .put(
//         apiList.rating,
//         { rating: rating, jobId: application.job._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setPopup({
//           open: true,
//           severity: "success",
//           message: "Rating updated successfully",
//         });
//         fetchRating();
//         setOpen(false);
//       })
//       .catch((err) => {
//         // console.log(err.response);
//         console.log(err);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.data.message,
//         });
//         fetchRating();
//         setOpen(false);
//       });
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const colorSet = {
//     applied: "#3454D1",
//     shortlisted: "#DC851F",
//     accepted: "#09BC8A",
//     rejected: "#D1345B",
//     deleted: "#B49A67",
//     cancelled: "#FF8484",
//     finished: "#4EA5D9",
//   };

//   return (
//     <Paper className={classes.jobTileOuter} elevation={3}>
//       <Grid container>
//         <Grid container item xs={9} spacing={1} direction="column">
//           <Grid item>
//             <Typography variant="h5">{application.job.title}</Typography>
//           </Grid>
//           <Grid item>Posted By: {application.recruiter.name}</Grid>
//           <Grid item>Role : {application.job.jobType}</Grid>
//           <Grid item>Salary : &#8377; {application.job.salary} per month</Grid>
//           <Grid item>
//             Duration :{" "}
//             {application.job.duration !== 0
//               ? `${application.job.duration} month`
//               : `Flexible`}
//           </Grid>
//           <Grid item>
//             {application.job.skillsets.map((skill) => (
//               <Chip label={skill} style={{ marginRight: "2px" }} />
//             ))}
//           </Grid>
//           <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
//           {application.status === "accepted" ||
//           application.status === "finished" ? (
//             <Grid item>Joined On: {joinedOn.toLocaleDateString()}</Grid>
//           ) : null}
//         </Grid>
//         <Grid item container direction="column" xs={3}>
//           <Grid item xs>
//             <Paper
//               className={classes.statusBlock}
//               style={{
//                 background: colorSet[application.status],
//                 color: "#ffffff",
//               }}
//             >
//               {application.status}
//             </Paper>
//           </Grid>
//           {application.status === "accepted" ||
//           application.status === "finished" ? (
//             <Grid item>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 className={classes.statusBlock}
//                 onClick={() => {
//                   fetchRating();
//                   setOpen(true);
//                 }}
//               >
//                 Rate Job
//               </Button>
//             </Grid>
//           ) : null}
//         </Grid>
//       </Grid>
//       <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
//         <Paper
//           style={{
//             padding: "20px",
//             outline: "none",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             minWidth: "30%",
//             alignItems: "center",
//           }}
//         >
//           <Rating
//             name="simple-controlled"
//             style={{ marginBottom: "30px" }}
//             value={rating === -1 ? null : rating}
//             onChange={(event, newValue) => {
//               setRating(newValue);
//             }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             style={{ padding: "10px 50px" }}
//             onClick={() => changeRating()}
//           >
//             Submit
//           </Button>
//         </Paper>
//       </Modal>
//     </Paper>
//   );
// };

// const Applications = (props) => {
//   const setPopup = useContext(SetPopupContext);
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     axios
//       .get(apiList.applications, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setApplications(response.data);
//       })
//       .catch((err) => {
//         // console.log(err.response);
//         console.log(err.response.data);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: "Error",
//         });
//       });
//   };

//   return (
//     <Grid
//       container
//       item
//       direction="column"
//       alignItems="center"
//       style={{ padding: "30px", minHeight: "93vh"}}
//     >
//       <Grid item>
//         <Typography variant="h2">About us</Typography>
//       </Grid>
//       <Grid
//         container
//         item
//         xs
//         direction="column"
//         style={{ width: "100%" }}
//         alignItems="stretch"
//         justify="center"
//       >
//         {applications.length > 0 ? (
//           applications.map((obj) => (
//             <Grid item>
//               <ApplicationTile application={obj} />
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="h5" style={{ textAlign: "center", fontFamily: ""}
//         }>

// Welcome to JobNet - job recruiting  website! We are a team of passionate developers who are dedicated to creating a platform that connects professionals from all over the world.<br/>
// <br/>

// Our mission is to provide a platform that empowers professionals to build their careers, network with like-minded individuals, and find new opportunities. We understand that the job market is constantly evolving, and we believe that our platform can help bridge the gap between job seekers and employers.
// Our platform is designed to be user-friendly and intuitive, with features that enable our members to create comprehensive profiles, showcase their skills and experience, and connect with other professionals in their industry.<br/>
// <br/>

// We are committed to creating a safe and inclusive environment for all of our members. We believe that diversity and inclusivity are essential components of any successful community, and we strive to create a platform that reflects these values.

// Thank you for joining us on this journey! We are excited to help you build your career and achieve your professional goals.
//           </Typography>
//         )}
//       </Grid>
//     </Grid>
//   );
// };

// export default Applications;
import React from "react";
import { Typography } from "@material-ui/core";
function Applications() {
  return (
    <div>
      <Typography variant="h5" style={{ textAlign: "center", fontFamily: "" }}>
        Welcome to Jobs.io - job recruiting website! We are a team of passionate
        developers who are dedicated to creating a platform that connects
        professionals from all over the world.
        <br />
        <br />
        Our mission is to provide a platform that empowers professionals to
        build their careers, network with like-minded individuals, and find new
        opportunities. We understand that the job market is constantly evolving,
        and we believe that our platform can help bridge the gap between job
        seekers and employers. Our platform is designed to be user-friendly and
        intuitive, with features that enable our members to create comprehensive
        profiles, showcase their skills and experience, and connect with other
        professionals in their industry.
        <br />
        <br />
        We are committed to creating a safe and inclusive environment for all of
        our members. We believe that diversity and inclusivity are essential
        components of any successful community, and we strive to create a
        platform that reflects these values. Thank you for joining us on this
        journey! We are excited to help you build your career and achieve your
        professional goals.
      </Typography>
    </div>
  );
}

export default Applications;
