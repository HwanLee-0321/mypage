import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";
import { Image } from "../utils/Image";

// Define interfaces for better type safety
interface Study {
  id?: string; // Add for key, though it's nested
  institute: string;
  logo: string;
  url: string;
  title: string;
  durationInYears: string;
  graduationYear: number;
}

interface EducationData {
  studies: Study[];
  // certifications might also be in here, but this component only uses studies
}

export const Education = () => {
  const [education, setEducation] = useState<EducationData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("education");
      // The data for 'education' is a single document in an array
      if (data && data.length > 0) {
        setEducation(data[0] as unknown as EducationData);
      }
    };

    fetchData();
  }, []);

  if (!education) {
    return null; // or a loading spinner
  }

  return (
    <Container>
      <h2>Education</h2>
      <Row>
        {education.studies.map((study: Study, i: number) => (
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
