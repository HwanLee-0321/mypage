import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";
import { Image } from "../utils/Image";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../utils/localization";

// Define interfaces for better type safety
interface Certification {
  verificationLink: string;
  logo: string;
  title: any;
}

export const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("certifications");
      if (data) {
        setCertifications(data as unknown as Certification[]);
      }
    };

    fetchData();
  }, []);

  if (certifications.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <Container className="certifications">
      <h2>{t('certifications')}</h2>
      <Row>
        {certifications.map(function (certification: Certification, i: number) {
          return (
            <Col key={i} xs={2} md={2}>
              <a
                href={certification.verificationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image name={certification.logo} alt={getLocalizedText(certification.title, i18n.language)} />
              </a>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
