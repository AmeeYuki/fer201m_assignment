import { Container, Divider, Typography } from "@mui/material";
import React, { Component } from "react";
import PetList from "./PetList";

export default function Pets() {
  return (
    <div className="mt-2">
      <Container>
        <Typography variant="h4"> Pet List</Typography>
        <hr />
        <PetList></PetList>
      </Container>
    </div>
  );
}
