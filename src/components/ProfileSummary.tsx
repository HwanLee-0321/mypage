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
          <h1 className="display-3">안녕하세요. 이재환입니다.</h1>
          <p className="lead">
            현재 개발을 3년이상 하고 있는 <strong>소프트웨어 엔지니어</strong>입니다.
            저의 주요 관심사는 AI, 백엔드, 프론트이며 주로 AI 개발에 강점을 가지고 있습니다. 
            빠른 학습 능력, 목표 지향적인 성격, 그리고 팀워크를 중요하게 생각합니다. 
            2022년부터 신기술과 AI에 관련해서 많은 관심을 가지고 현재까지도 꾸준히 팔로잉 중에 있습니다.
          </p>
          <SocialIcons />
        </Col>
      </Row>
    </Container>
  );
};
