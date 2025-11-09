import React, { memo } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import dhackIcon from "../assets/images/dhack.png";
import bojIcon from "../assets/images/boj.png";
import velog from "../assets/images/velog.png";

const SocialIconsComponent = () => (
  <div className="social">
    <a
      href="https://github.com/HwanLee-0321"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <FontAwesomeIcon icon={faGithub} />
    </a>
    <a
      href="https://dreamhack.io/users/74674"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Dreamhack profile"
    >
      <img src={dhackIcon} alt="Dhack" className="social-icon-img" loading="lazy" decoding="async" />
    </a>
    <a
      href="https://www.acmicpc.net/user/ghksdl0321"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="BOJ profile"
    >
      <img src={bojIcon} alt="boj" className="social-icon-img" loading="lazy" decoding="async" />
    </a>
    <a
      href="https://velog.io/@hwan_lee/posts"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Velog posts"
    >
      <img src={velog} alt="velog" className="social-icon-img" loading="lazy" decoding="async" />
    </a>
  </div>
);

const SocialIcons = memo(SocialIconsComponent);
SocialIcons.displayName = "SocialIcons";

export default SocialIcons;
