import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";

import { About } from "./components/About";
import { Awards } from "./components/Awards";
import { Certifications } from "./components/Certifications";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { ProfileSummary } from "./components/ProfileSummary";
import Skills from "./components/Skills";
import { TopBar } from "./components/TopBar";
import { VelogSidebar } from "./components/VelogSidebar";
import Projects from "./components/Project";

export const App = () => {
  return (
    <div className="App">
      <TopBar />
      <ProfileSummary />
      <Container>
        <Row>
          {/* Left Sidebar: Awards and Velog */}
          <Col md={3} className="sidebar">
            <Awards />
            <hr className="sidebar-divider" />
            <VelogSidebar />
          </Col>

          {/* Main Content */}
          <Col md={9} className="main-content">
            <Row>
              <Skills />
            </Row>
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
            {/* About 컴포넌트를 이 위치에서 제거합니다. */}
          </Col>
        </Row>
      </Container>

      {/* About 컴포넌트를 Container 외부, Footer 상단으로 이동 */}
      <About />
      
      <Footer />
    </div>
  );
};