import React, { useState, useEffect } from "react";
import moment from "moment";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";
import { Image } from "../utils/Image";

// Define interfaces for the data structure
interface Role {
  title: string;
  startDate: string;
  endDate: string;
  Present: boolean;
  location: string;
}

interface ExperienceData {
  id: string;
  companyName: string;
  url: string;
  logo: string;
  roles: Role[];
}

// Function to convert duration to "years" and "months"
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
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("experience");
      if (data) {
        setExperiences(data as ExperienceData[]);
      }
    };

    fetchData();
  }, []);

  if (experiences.length === 0) {
    return null; // Or a loading indicator
  }

  return (
    <Container>
      <h2>Experience</h2>
      <Row>
        {experiences.map((experience) => {
          moment.locale("en");

          const totalDuration = experience.roles.reduce((cnt: number, role: Role) => {
            const startDate = moment(role.startDate);
            const timeEnd = moment(role.Present ? new Date() : new Date(role.endDate));
            const duration = moment.duration(timeEnd.diff(startDate));
            return cnt + duration.asMonths();
          }, 0);

          return (
            <Col md={6} key={experience.id}>
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
                  {experience.roles.map((role: Role, j: number) => {
                    const startDate = moment(role.startDate);
                    const timeEnd = moment(role.Present ? new Date() : new Date(role.endDate));
                    const duration = moment.duration(timeEnd.diff(startDate)).asMonths();

                    return (
                      <div key={j} className="mb-3">
                        <h6 className="mb-0">{role.title}</h6>
                        <small className="text-muted">
                          {startDate.format("MMM YYYY")} - {role.Present ? "Present" : timeEnd.format("MMM YYYY")} ({getDuration(duration)})
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

