import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Image } from "../utils/Image";
import SocialIcons from "./SocialIcons";

export const ProfileSummary = () => {
  return (
    <Container className="profileSummary">
      <Row className="align-items-center">
        <Col xs={12} md={3} className="text-center">
          <div className="profileSummaryPicture">
            <Image name="profilePic.png" alt="Oswaldo Diaz's profile picture" />
          </div>
        </Col>
        <Col xs={12} md={9}>
          <hr />
          <h2 className="display-3">Welcome Lee Jae-Hwan's Page</h2>
          <SocialIcons />
        </Col>
      </Row>
    </Container>
  );
};
