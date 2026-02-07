import React from "react";
import { Container, Navbar, NavbarBrand, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { Image } from "../utils/Image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import dhackIcon from "../assets/images/dhack.png";
import bojIcon from "../assets/images/boj.png";
import velog from "../assets/images/velog.png";
import "./TopBar.css";

interface TopBarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const TopBar = ({ theme, onToggleTheme }: TopBarProps) => {
  const isLight = theme === "light";

  return (
    <Navbar expand="md" className="topbar" bg="none" variant={isLight ? "light" : "dark"}>
      <Container className="topbar__inner">
        <NavbarBrand href="/" className="topbar__brand">
          <Image
            name="profilePic.png"
            alt="Lee Jae-Hwan profile"
            className="profilePic"
            loading="eager"
            decoding="auto"
          />
          <strong>@HwanLee</strong>
        </NavbarBrand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Social Links */}
            <Nav.Link
              href="https://github.com/HwanLee-0321"
              target="_blank"
              rel="noopener noreferrer"
              className="social-nav-link"
            >
              <FontAwesomeIcon icon={faGithub} className="social-icon" />
              <span className="social-text">GitHub</span>
            </Nav.Link>

            <Nav.Link
              href="https://scholar.google.com/citations?user=GnqbP2gAAAAJ&hl=ko"
              target="_blank"
              rel="noopener noreferrer"
              className="social-nav-link"
            >
              <FontAwesomeIcon icon={faGraduationCap as any} className="social-icon" />
              <span className="social-text">Scholar</span>
            </Nav.Link>

            <Nav.Link
              href="https://dreamhack.io/users/74674"
              target="_blank"
              rel="noopener noreferrer"
              className="social-nav-link"
            >
              <img src={dhackIcon} alt="Dreamhack" className="social-icon-img" />
              <span className="social-text">Dreamhack</span>
            </Nav.Link>

            <Nav.Link
              href="https://www.acmicpc.net/user/ghksdl0321"
              target="_blank"
              rel="noopener noreferrer"
              className="social-nav-link"
            >
              <img src={bojIcon} alt="BOJ" className="social-icon-img" />
              <span className="social-text">BOJ</span>
            </Nav.Link>

            <Nav.Link
              href="https://velog.io/@hwan_lee/posts"
              target="_blank"
              rel="noopener noreferrer"
              className="social-nav-link"
            >
              <img src={velog} alt="Velog" className="social-icon-img" />
              <span className="social-text">Velog</span>
            </Nav.Link>

            {/* Theme Toggle & Language Switcher */}
            <div className="d-flex align-items-center ms-3">
              <button
                type="button"
                className="theme-toggle"
                onClick={onToggleTheme}
                aria-pressed={isLight}
                aria-label="Toggle light / dark theme"
              >
                <span className="theme-toggle__icon" role="img" aria-hidden="true">
                  {isLight ? "🌙" : "☀️"}
                </span>
                <span className="theme-toggle__label">{isLight ? "Dark" : "Light"} Mode</span>
              </button>
              <LanguageSwitcher />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
