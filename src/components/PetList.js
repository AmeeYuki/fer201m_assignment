import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import axios from "axios";
import { Grid } from "@mui/material";

export default function PetList() {
  const [APIData, setAPIData] = React.useState([]);
  const petURL = "https://65450ed15a0b4b04436d8d79.mockapi.io/animalManagement";

  React.useEffect(() => {
    axios
      .get(petURL)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setAPIData(
          data.sort((a, b) => {
            return a.id - b.id;
          })
        );
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
                <Link
                  href="#product-card"
                  fontWeight="md"
                  color="neutral"
                  textColor="text.primary"
                  overlay
                >
                  {pet.petName}
                </Link>

                <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: "xl" }}
                  endDecorator={
                    <Chip
                      component="span"
                      size="sm"
                      variant="soft"
                      color="success"
                    >
                      Lowest price
                    </Chip>
                  }
                >
                  {pet.price} $
                </Typography>
                <Typography level="body-sm">({pet.feedBack})</Typography>
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
    </div>
  );
}
