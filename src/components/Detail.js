import { Box, Card, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Detail() {
  const pet = useParams();
  const [APIData, setAPIData] = useState([]);
  const petURL = `https://65450ed15a0b4b04436d8d79.mockapi.io/animalManagement/${pet.id}`;

  useEffect(() => {
    fetch(petURL, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, [petURL]);

  return (
    <div className="mt-4">
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography level="h2">Detail</Typography>
          <Typography level="body-lg">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              Back to home <KeyboardReturnIcon />
            </Link>
          </Typography>
        </Stack>
        <hr />
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid xs={12} md={4}>
              <img
                style={{ borderRadius: "10%" }}
                width="100%"
                src={APIData.image}
                alt={APIData.petName}
              />
            </Grid>

            <Grid xs={12} md={6}>
              <Card variant="outlined">
                <Container>
                  <Typography textAlign={"center"} level="h3">
                    Information{" "}
                  </Typography>
                  <hr />
                  <Typography level="h3">Name: {APIData.petName}</Typography>
                  <Typography level="h4">Type: {APIData.type}</Typography>
                  <Typography level="h4">Age: {APIData.age}</Typography>
                  <Typography level="h4">
                    Feedback: {APIData.feedBack}
                  </Typography>
                  <Typography level="body-lg">
                    Description: {APIData.description}
                  </Typography>
                  <br />
                  <br />
                  <br />
                  <Typography textAlign={"end"} color="danger" level="body-lg">
                    {APIData.price} $
                  </Typography>

                  <Stack
                    className="mt-2"
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button>Add to cart</Button>
                  </Stack>
                  <br />
                </Container>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
