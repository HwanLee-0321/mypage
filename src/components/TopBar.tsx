import React from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { Image } from "../utils/Image";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
        <div className="d-flex align-items-center">
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
      </Container>
    </Navbar>
  );
};
