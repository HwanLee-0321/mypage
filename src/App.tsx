import React, { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import "./i18n"; // Initialize i18n

import { Container, Row, Col } from "react-bootstrap";

import { TopBar } from "./components/TopBar";
import { ProfileSummary } from "./components/ProfileSummary";
import { Chatbot } from "./components/Chatbot";

const AwardsSection = lazy(() =>
  import("./components/Awards").then((module) => ({ default: module.Awards }))
);
const CertificationsSection = lazy(() =>
  import("./components/Certifications").then((module) => ({
    default: module.Certifications,
  }))
);
const EducationSection = lazy(() =>
  import("./components/Education").then((module) => ({ default: module.Education }))
);
const ExperienceSection = lazy(() =>
  import("./components/Experience").then((module) => ({ default: module.Experience }))
);
const AboutSection = lazy(() =>
  import("./components/About").then((module) => ({ default: module.About }))
);
const FooterSection = lazy(() =>
  import("./components/Footer").then((module) => ({ default: module.Footer }))
);
const SkillsSection = lazy(() => import("./components/Skills"));
const ProjectsSection = lazy(() => import("./components/Project"));
const VelogSidebarSection = lazy(() => import("./components/VelogSidebar"));
const SimpleGameSection = lazy(() => import("./components/SimpleGame"));

type ThemeMode = "dark" | "light";

const SectionFallback: React.FC<{ minHeight?: number }> = ({ minHeight = 220 }) => (
  <div className="section-fallback" style={{ minHeight }}>
    <div className="section-fallback__shimmer" />
  </div>
);

export const App = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("theme-preference");
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme-preference", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="App">
      <TopBar theme={theme} onToggleTheme={toggleTheme} />
      <ProfileSummary />
      <Container>
        <Row>
          {/* Left Sidebar: Awards and Velog */}
          <Col md={3} className="sidebar">
            <Suspense fallback={<SectionFallback minHeight={300} />}>
              <AwardsSection />
            </Suspense>
            <hr className="sidebar-divider" />
            <Suspense fallback={<SectionFallback minHeight={280} />}>
              <VelogSidebarSection />
            </Suspense>
          </Col>

          {/* Main Content */}
          <Col md={9} className="main-content">
            <Suspense fallback={<SectionFallback minHeight={260} />}>
              <Row>
                <SkillsSection />
              </Row>
            </Suspense>
            <Suspense fallback={<SectionFallback minHeight={240} />}>
              <Row>
                <CertificationsSection />
              </Row>
            </Suspense>
            <Suspense fallback={<SectionFallback minHeight={320} />}>
              <Row>
                <ProjectsSection />
              </Row>
            </Suspense>
            <Suspense fallback={<SectionFallback minHeight={300} />}>
              <Row>
                <ExperienceSection />
              </Row>
            </Suspense>
            <Suspense fallback={<SectionFallback minHeight={260} />}>
              <Row>
                <EducationSection />
              </Row>
            </Suspense>
          </Col>
        </Row>
      </Container>

      <Suspense fallback={<SectionFallback minHeight={200} />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight={400} />}>
        {/* <SimpleGameSection /> */}
      </Suspense>

      <Suspense fallback={<SectionFallback minHeight={160} />}>
        <FooterSection />
      </Suspense>
      <Chatbot />
    </div>
  );
};
