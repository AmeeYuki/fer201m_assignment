import React, { Component } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Container, Divider, Grid } from "@mui/material";
import axios from "axios";

export default class PetList extends Component {
  state = {
    pet: [],
  };

  componentDidMount() {
    axios
      .get(`https://65450ed15a0b4b04436d8d79.mockapi.io/animalManagement`)
      .then((res) => {
        const pet = res.data;
        this.setState({ pet });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <Container>
          <div className="pb-3">
            <Divider sx={{ fontSize: "50%" }}>
              <Typography level="h4">List Pets</Typography>
            </Divider>
          </div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            {this.state.pet.map((pet) => (
              <Grid xs={4} className="mt-4">
                <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
                  <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200 }}>
                      <img
                        src={pet.image}
                        srcSet={pet.image}
                        loading="lazy"
                        alt=""
                      />
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent>
                    <Typography level="body-xs">{pet.type}</Typography>
                    <Link
                      href="#product-card"
                      fontWeight="md"
                      color="neutral"
                      textColor="text.primary"
                      overlay
                      endDecorator={<ArrowOutwardIcon />}
                    >
                      {pet.petName}
                    </Link>

                    <Typography
                      level="title-lg"
                      sx={{ mt: 1, fontWeight: "xl" }}
                    >
                      {pet.price} $
                    </Typography>
                    <Typography level="body-sm">({pet.description})</Typography>
                  </CardContent>
                  <CardOverflow>
                    <Button variant="solid" color="danger" size="lg">
                      View Detail
                    </Button>
                  </CardOverflow>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}
