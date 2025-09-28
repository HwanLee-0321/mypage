import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";
import { Image } from "../utils/Image";

// Define interfaces for better type safety
interface Certification {
    verificationLink: string;
    logo: string;
    title: string;
}

interface EducationData {
  certifications: Certification[];
  // studies might also be in here, but this component only uses certifications
}


export const Certifications = () => {
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
    <Container className="certifications">
      <h2>Certifications</h2>
      <Row>
        {education.certifications.map(function (certification: Certification, i: number) {
          return (
            <Col key={i} xs={2} md={2}>
              <a
                href={certification.verificationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image name={certification.logo} alt={certification.title} />
              </a>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
