import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import {
  Avatar,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import axios from "axios";

export default function Dashboard() {
  const [APIData, setAPIData] = React.useState([]);
  const [selectedPet, setSelectedPet] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const petURL = "https://65450ed15a0b4b04436d8d79.mockapi.io/animalManagement";

  React.useEffect(() => {
    axios
      .get(petURL)
      .then((response) => response.data)
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleDeleteClick = (pet) => {
    setSelectedPet(pet);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPet) {
      // Make a DELETE request to your API to delete the selected pet
      axios
        .delete(`${petURL}/${selectedPet.id}`)
        .then(() => {
          // Remove the deleted pet from the state
          setAPIData((prevData) =>
            prevData.filter((pet) => pet.id !== selectedPet.id)
          );
          setSelectedPet(null);
        })
        .catch((error) => console.log(error.message));
    }
    setOpenDialog(false);
  };

  return (
    <Container className="mt-4">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography level="h3">Dashboard</Typography>
        <Typography level="body-lg">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            Back to home <KeyboardReturnIcon />
          </Link>
        </Typography>
      </Stack>
      <hr />
      <Grid className="mt-3 mb-3" textAlign={"end"}>
        <Button variant="solid" size="lg" color="primary">
          <Typography level="body-lg">
            <Link
              to={"/addPet"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Add new pet <KeyboardReturnIcon />
            </Link>
          </Typography>
        </Button>
      </Grid>
      <Box sx={{ width: "100%" }}>
        <Sheet
          variant="outlined"
          sx={{
            "--TableCell-height": "40px",
            // the number is the amount of the header rows.
            "--TableHeader-height": "calc(1 * var(--TableCell-height))",
            "--Table-firstColumnWidth": "20px",
            "--Table-lastColumnWidth": "100px",
            // background needs to have transparency to show the scrolling shadows
            "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
            "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
            overflow: "auto",
            background: (theme) =>
              `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
            backgroundSize:
              "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "local, local, scroll, scroll",
            backgroundPosition:
              "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
            backgroundColor: "background.surface",
          }}
        >
          <Table
            borderAxis="bothBetween"
            stripe="odd"
            hoverRow
            sx={{
              "& tr > *:first-child": {
                position: "sticky",
                left: 0,
                boxShadow: "1px 0 var(--TableCell-borderColor)",
                bgcolor: "background.surface",
              },
              "& tr > *:last-child": {
                position: "sticky",
                right: 0,
                bgcolor: "var(--TableCell-headBackground)",
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "var(--Table-firstColumnWidth)" }}>ID</th>{" "}
                <th style={{ width: 40 }}>Image</th>
                <th style={{ width: 150 }}>Name</th>
                <th style={{ width: 90 }}>Type</th>
                <th style={{ width: 70 }}>Age</th>
                <th style={{ width: 100 }}>Price</th>
                <th style={{ width: 100 }}>Status</th>
                <th
                  aria-label="last"
                  style={{
                    width: "var(--Table-lastColumnWidth)",
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {APIData.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.id}</td>
                  <td>
                    <Avatar variant="square" src={pet.image}>
                      N{" "}
                    </Avatar>
                  </td>
                  <td>{pet.petName}</td>
                  <td>{pet.type}</td>
                  <td>{pet.age}</td>
                  <td>{pet.price}</td>
                  <td>{pet.status}</td>
                  <td>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Link to={`/updatePet/${pet.id}`}>
                        <Button size="sm" variant="solid" color="neutral">
                          Edit
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="solid"
                        color="danger"
                        onClick={() => handleDeleteClick(pet)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Pet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            {selectedPet ? selectedPet.petName : ""}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="neutral">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="danger">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
