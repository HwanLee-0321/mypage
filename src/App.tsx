

import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";

import { About } from "./components/About";
import { Certifications } from "./components/Certifications";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Projects } from "./components/Project";
import { ProfileSummary } from "./components/ProfileSummary";
import { TopBar } from "./components/TopBar";
import { VelogSidebar } from "./components/VelogSidebar"; // 새로 추가

export const App = () => {
  return (
    <div className="App">
      <TopBar />
      <ProfileSummary />
      <Container>
        <Row>
          <Col md={9}> {/* 기존 콘텐츠를 9열로 감싸기 */}
            <Row>
              <Certifications />
            </Row>
            <Row>
              <Projects />
            </Row>
            <Row>
              <Experience />
            </Row>
            <Row>
              <Education />
            </Row>
            <Row>
              <About />
            </Row>
          </Col>
          <Col md={3}> {/* 사이드바를 3열로 추가 */}
            <VelogSidebar />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};