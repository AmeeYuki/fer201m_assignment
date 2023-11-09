import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Grid } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdatePet() {
  const pet = useParams();

  const [open, setOpen] = useState(false);

  const [APIData, setAPIData] = useState([]);
  const petURL = `https://65450ed15a0b4b04436d8d79.mockapi.io/animalManagement/${pet.id}`;

  useEffect(() => {
    axios
      .get(petURL)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, [petURL]);

  const handleClose = () => {
    setOpen(false);
  };

  const putPetURL =
    "https://65450ed15a0b4b04436d8d79.mockapi.io/animalManagement/";

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: APIData,
    onSubmit: (values) => {
      axios
        .put(`${putPetURL}/${pet.id}`, values)
        .then((response) => {
          return response.data;
        })
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
    },
    validationSchema: Yup.object({
      petName: Yup.string()
        .required("Required.")
        .min(3, "Must be more than 2 characters"),
      type: Yup.string().required("Required."),
      age: Yup.number()
        .integer()
        .required("Required.")
        .typeError("Please enter a valid number"),
      price: Yup.number()
        .required("Required.")
        .positive("Please enter a positive number"),
      image: Yup.string()
        .url()
        .required("Required.")
        .typeError("Please enter a valid URL"),
      description: Yup.string().required("Required."),
      feedBack: Yup.string().required("Required."),
      status: Yup.string().required("Required."),
    }),
  });

  return (
    <div>
      <Container className="mt-4">
        <h1 className="font-pages">Update Pet</h1>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={12} md={12}>
                <Typography>Pet Name</Typography>
                <TextField
                  fullWidth
                  name="petName"
                  value={formik.values.petName}
                  onChange={formik.handleChange}
                />
                {formik.errors.petName && (
                  <Typography variant="caption" color="red">
                    {formik.errors.petName}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={12}>
                <Typography>Type</Typography>
                <TextField
                  fullWidth
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                />
                {formik.errors.type && (
                  <Typography variant="caption" color="red">
                    {formik.errors.type}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={12}>
                <Typography>Age</Typography>
                <TextField
                  fullWidth
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                />
                {formik.errors.age && (
                  <Typography variant="caption" color="red">
                    {formik.errors.age}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={12}>
                <Typography>Price</Typography>
                <TextField
                  fullWidth
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.errors.price && (
                  <Typography variant="caption" color="red">
                    {formik.errors.price}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={12}>
                <Typography>Image URL</Typography>
                <TextField
                  fullWidth
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                />
                {formik.errors.image && (
                  <Typography variant="caption" color="red">
                    {formik.errors.image}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={12}>
                <Typography>Description</Typography>
                <TextField
                  fullWidth
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && (
                  <Typography variant="caption" color="red">
                    {formik.errors.description}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={12}>
                <Typography>Feedback</Typography>
                <TextField
                  fullWidth
                  name="feedBack"
                  value={formik.values.feedBack}
                  onChange={formik.handleChange}
                />
                {formik.errors.feedBack && (
                  <Typography variant="caption" color="red">
                    {formik.errors.feedBack}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={12}>
                <Typography>Status</Typography>
                <TextField
                  fullWidth
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                />
                {formik.errors.status && (
                  <Typography variant="caption" color="red">
                    {formik.errors.status}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Stack>
          <Stack spacing={2}></Stack>

          <Button variant="contained" size="small" type="submit">
            Save
          </Button>
        </form>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Congratulations"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Alert severity="success">
                <AlertTitle>Updating successful!</AlertTitle>
              </Alert>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                Dashboard
              </Link>
            </Button>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
