import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";

import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";

import axios from "axios";
import { Grid } from "@mui/material";

export default function PetList() {
  const [APIData, setAPIData] = React.useState([]);
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

  return (
    <div>
      <Grid container spacing={2}>
        {" "}
        {APIData.map((pet) => (
          <Grid item xs={4}>
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
                <Typography level="h4">{pet.petName}</Typography>
                <Typography level="title-lg" sx={{ mt: 1, fontWeight: "xl" }}>
                  {pet.price} $
                </Typography>{" "}
                <Typography level="body-sm">({pet.feedBack})</Typography>
              </CardContent>

              <Grid textAlign={"end"}>
                {" "}
                <Link to={`detail/${pet.id}`}>
                  <Button variant="solid" color="danger" size="lg">
                    View Detail
                  </Button>
                </Link>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
