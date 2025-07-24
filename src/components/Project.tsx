import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import { getData } from "../utils/dataExtractor";
import { Image } from "../utils/Image";

export const Projects = () => {
  const projects = getData("projects");
  return (
    <Container>
      <h2>Projects</h2>
      <Row>
        {projects.map((project: any, i: number) => {
          moment.locale("en");
          return (
            <Col md={6} key={i}>
              <Card className="mb-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={3} className="text-center">
                      <Image name={project.path} alt={project.title} className="card-img-top" />
                    </Col>
                    <Col xs={9}>
                      <Card.Title>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          {project.title}
                        </a>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {moment(project.date).format("YYYY, MMM Do")}
                      </Card.Subtitle>
                      <Card.Text>
                        {project.description}
                        {project.post && (
                          <>
                            <br />
                            <a href={project.post} target="_blank" rel="noopener noreferrer">
                              관련 포스트 보기
                            </a>
                          </>
                        )}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};