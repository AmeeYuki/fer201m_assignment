import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Divider, Stack } from "@mui/material";

export default function Footer() {
  return (
    <div>
      <Box
        component="footer"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          p: 6,
          position: "relative",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid xs={3} sx={{ textAlign: "left" }}>
              <Typography variant="h6" color="text.primary">
                About Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We are XYZ company, dedicated to providing the best service to
                our customers.
              </Typography>
            </Grid>

            <Grid xs={3} sx={{ textAlign: "right" }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact Us
              </Typography>
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
          <Divider />
          <Box mt={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              spacing={2}
            >
              <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright © "}
                YuuMee Pets {"  "}
                {new Date().getFullYear()}
              </Typography>
              <Grid item xs={12} sm={4}>
                <Link href="#" color="inherit">
                  <Facebook />
                </Link>
                <Link href="#" color="inherit" sx={{ pl: 1, pr: 1 }}>
                  <Instagram />
                </Link>
                <Link href="#" color="inherit">
                  <Twitter />
                </Link>
              </Grid>
            </Stack>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
