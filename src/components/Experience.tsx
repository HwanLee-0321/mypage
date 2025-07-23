import React from "react";
import moment from "moment";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";
import { Image } from "../utils/Image";

// 기간을 "년"과 "월"로 변환하는 함수
const getDuration = (duration: number) => {
  const years = Math.floor(duration / 12);
  const months = Math.round(duration % 12);
  let result = "";
  if (years > 0) {
    result += `${years} year${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    if (years > 0) result += " and ";
    result += `${months} month${months > 1 ? "s" : ""}`;
  }
  return result;
};

export const Experience = () => {
  const experiences = getData("experience");
  return (
    <Container>
      <h2>Experience</h2>
      <Row>
        {experiences.map((experience: any, i: number) => {
          moment.locale("en");

          const totalDuration = experience.roles.reduce((cnt: number, role: any) => {
            const startDate = moment(role.startDate);
            const timeEnd = moment(role.currentJob ? new Date() : new Date(role.endDate));
            const duration = moment.duration(timeEnd.diff(startDate));
            return cnt + duration.asMonths();
          }, 0);

          return (
            <Col md={6} key={i}>
              <Card className="mb-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={3} className="text-center">
                      <Image name={experience.logo} alt={experience.companyName} className="card-img-top" />
                    </Col>
                    <Col xs={9}>
                      <Card.Title>
                        <a href={experience.url} target="_blank" rel="noopener noreferrer">
                          {experience.companyName}
                        </a>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{getDuration(totalDuration)}</Card.Subtitle>
                    </Col>
                  </Row>
                  <hr />
                  {experience.roles.map((role: any, j: number) => {
                    const startDate = moment(role.startDate);
                    const timeEnd = moment(role.currentJob ? new Date() : new Date(role.endDate));
                    const duration = moment.duration(timeEnd.diff(startDate)).asMonths();

                    return (
                      <div key={j} className="mb-3">
                        <h6 className="mb-0">{role.title}</h6>
                        <small className="text-muted">
                          {startDate.format("MMM YYYY")} - {role.currentJob ? "Present" : timeEnd.format("MMM YYYY")} ({getDuration(duration)})
                        </small>
                        <br />
                        <small className="text-muted">{role.location}</small>
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
