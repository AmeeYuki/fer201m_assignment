import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import logo from "../assets/image/Logo.png";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Avatar, Box, Divider, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      className="mt-5"
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About us
            </Typography>
            <hr></hr>
            <Typography variant="body2" color="text.secondary">
              Nestled in the heart of the town, our charming pet shop is a haven
              for furry friends and their devoted owners, offering a delightful
              array of high-quality pet supplies, wholesome treats, and a warm,
              welcoming atmosphere for all animal lovers.
            </Typography>
          </Grid>
          <Grid item xs={3} textAlign={"end"}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <hr></hr>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" color="text.secondary" align="">
              {"Copyright © "}
              YuuMee Pets {new Date().getFullYear()}
              {"."}
            </Typography>

            <div>
              <Link href="https://www.facebook.com/" color="inherit">
                <Facebook />
              </Link>
              <Link
                href="https://www.instagram.com/"
                color="inherit"
                sx={{ pl: 1, pr: 1 }}
              >
                <Instagram />
              </Link>
              <Link href="https://www.twitter.com/" color="inherit">
                <Twitter />
              </Link>
            </div>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
