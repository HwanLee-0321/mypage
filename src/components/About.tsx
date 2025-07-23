import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Image } from "../utils/Image";

const images: any = [
  {
    link: "https://reactjs.org/",
    alt: "React",
    logo: "react.png",
  },
  {
    link: "https://reactstrap.github.io/",
    alt: "Reactstrap",
    logo: "reactstrap.png",
  },
  {
    link: "https://fontawesome.com/",
    alt: "Font Awesome",
    logo: "fontAwesome.png",
  },
  {
    link: "http://momentjs.com/",
    alt: "Moment.js",
    logo: "moment.png",
  },
  {
    link: "https://github.com/ReactTraining/react-router",
    alt: "React-router",
    logo: "reactRouter.png",
  },
  {
    link: "https://www.typescriptlang.org/",
    alt: "TypeScript",
    logo: "typeScript.png",
  },
];

export const About = () => (
  <Container className="about">
    <hr />
    <Row className="text-center">
      <Col>
        <p className="lead">
          이 사이트는 S3에 정적 웹사이트로 배포되었으며, 다음 기술들을 사용하여
          구축되었습니다:
        </p>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {images.map((image: any, i: number) => (
            <a
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className="p-3"
            >
              <Image name={image.logo} alt={image.alt} />
              <strong className="ms-2">{image.alt}</strong>
            </a>
          ))}
        </div>
        <p className="mt-4">
          코드는 제 개인{" "}
          <a
            href="https://github.com/HwanLee-0321/mypage"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>{" "}
          계정에서 확인하실 수 있습니다.
        </p>
      </Col>
    </Row>
  </Container>
);
