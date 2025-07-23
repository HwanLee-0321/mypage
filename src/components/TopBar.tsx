import React from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { Image } from "../utils/Image";

export const TopBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <NavbarBrand href="/">
          <Image
            name="profilePic.png"
            alt="Oswaldo Díaz"
            className="profilePic"
          />
          <strong>@HwanLee</strong>
        </NavbarBrand>
      </Container>
    </Navbar>
  );
};
