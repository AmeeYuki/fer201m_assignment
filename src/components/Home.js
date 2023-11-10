import { Container, Divider, Typography } from "@mui/material";
import React, { Component } from "react";
import PetList from "./PetList";

export default function Home() {
  return (
    <div className="mt-4">
      <Container>
        <Typography variant="h5">
          <b> Pet List</b>
        </Typography>
        <hr />
        <PetList></PetList>
      </Container>
    </div>
  );
}
