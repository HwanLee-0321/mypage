import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Image } from "../utils/Image";
import SocialIcons from "./SocialIcons";
import './ProfileSummary.css'; // 스타일 파일을 import 합니다.

export const ProfileSummary = () => {
  const fullText = "Welcome Lee Jae-Hwan's Page";
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        // 타이핑이 끝나면 커서가 깜빡이도록 설정
        const cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
      }
    }, 100); // 타이핑 속도 조절

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <Container className="profileSummary">
      <Row className="align-items-center">
        <Col xs={12} md={3} className="text-center">
          <div className="profileSummaryPicture">
            <Image name="profilePic.png" alt="Lee Jae-Hwan's profile picture" />
          </div>
        </Col>
        <Col xs={12} md={9}>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button red"></span>
                <span className="terminal-button yellow"></span>
                <span className="terminal-button green"></span>
              </div>
              <div className="terminal-title">bash</div>
            </div>
            <div className="terminal-body">
              <span className="prompt">&gt; </span>
              {text}
              <span className={showCursor ? "cursor" : "cursor-hidden"}>|</span>
            </div>
          </div>
          <SocialIcons />
        </Col>
      </Row>
    </Container>
  );
};