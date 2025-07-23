import {
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import dhackIcon from '../assets/images/dhack.png';
import bojIcon from '../assets/images/boj.png';
import velog from '../assets/images/velog.png';

class SocialIcons extends React.Component {
  render() {
    return (
      <div className="social">
        <a
          href="https://github.com/HwanLee-0321"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://dreamhack.io/users/74674"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={dhackIcon} alt="Dhack" className="social-icon-img" />
        </a>
        <a
          href="https://www.acmicpc.net/user/ghksdl0321"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={bojIcon} alt="boj" className="social-icon-img" />
        </a>
        <a
          href="https://velog.io/@hwan_lee/posts"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={velog} alt="velog" className="social-icon-img" />
        </a>
      </div>
    );
  }
}

export default SocialIcons;
