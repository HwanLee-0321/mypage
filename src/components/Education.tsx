import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";
import { Image } from "../utils/Image";

export const Education = () => {
  const education = getData("education");
  return (
    <Container>
      <h2>Education</h2>
      <Row>
        {education.studies.map((study: any, i: number) => (
          <Col md={6} key={i}>
            <Card className="mb-4">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3} className="text-center">
                    <Image name={study.logo} alt={study.title} className="card-img-top" />
                  </Col>
                  <Col xs={9}>
                    <Card.Title>
                      <a href={study.url} target="_blank" rel="noopener noreferrer">
                        {study.institute}
                      </a>
                    </Card.Title>
                    <Card.Text className="mb-1">
                      <strong>Title:</strong> {study.title}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <strong>Graduation Year:</strong> {study.graduationYear}
                    </Card.Text>
                    <Card.Text>
                      <strong>Duration:</strong> {study.durationInYears} year(s)
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
