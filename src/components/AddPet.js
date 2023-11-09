import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function AddPet() {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const initialValues = {
    petName: "",
    image: "",
    age: "",
    price: "",
    type: "",
    description: "",
    feedBack: "",
    status: "",
  };

  const validationSchema = Yup.object({
    petName: Yup.string().required("Pet Name is required"),
    image: Yup.string()
      .url("Image must be a valid URL")
      .required("Image is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    type: Yup.string().required("Type is required"),
    description: Yup.string().required("Description is required"),
    feedBack: Yup.string().required("Feedback is required"),
    status: Yup.string().required("Status is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          "https://65450ed15a0b4b04436d8d79.mockapi.io/animalManagement",
          values
        )
        .then((response) => {
          console.log("Pet added successfully:", response.data);
          setSuccessDialogOpen(true);
        })
        .catch((error) => console.error("Error adding pet:", error));
    },
  });

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    setRedirectToDashboard(true);
  };

  return (
    <Container className="mt-4">
      <Typography variant="h4" gutterBottom>
        Add Pet
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="petName"
          name="petName"
          label="Pet Name"
          value={formik.values.petName}
          onChange={formik.handleChange}
          error={formik.touched.petName && Boolean(formik.errors.petName)}
          helperText={formik.touched.petName && formik.errors.petName}
          margin="normal"
        />

        <TextField
          fullWidth
          id="image"
          name="image"
          label="Image"
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
          margin="normal"
        />

        <TextField
          fullWidth
          id="age"
          name="age"
          label="Age"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
          margin="normal"
        />

        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          margin="normal"
        />

        <TextField
          fullWidth
          id="type"
          name="type"
          label="Type"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
          margin="normal"
        />

        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
        />

        <TextField
          fullWidth
          id="feedBack"
          name="feedBack"
          label="Feedback"
          value={formik.values.feedBack}
          onChange={formik.handleChange}
          error={formik.touched.feedBack && Boolean(formik.errors.feedBack)}
          helperText={formik.touched.feedBack && formik.errors.feedBack}
          margin="normal"
        />

        <TextField
          fullWidth
          id="status"
          name="status"
          label="Status"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          margin="normal"
        />

        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Add Pet
          </Button>
        </Box>
      </form>

      <Dialog open={successDialogOpen} onClose={handleSuccessDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Pet added successfully. Redirecting to dashboard...
          </Typography>
        </DialogContent>
        <DialogActions>
          <Link to={"/dashboard"}>
            <Button onClick={handleSuccessDialogClose} color="primary">
              OK
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
