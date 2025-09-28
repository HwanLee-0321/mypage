import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";

interface Award {
  id?: string; // Add id for React key
  title: string;
  award: string;
  date: string;
  description: string;
  file: string;
}

export const Awards = () => {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("awards");
      if (data) {
        setAwards(data as Award[]);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  if (awards.length === 0) {
    return null; // Or a loading indicator
  }

  return (
    <div>
      <h2>Awards</h2>
      <Row>
        {awards.map((award) => (
          <Col md={12} key={award.id}>
            <Card className="mb-4 award-card">
              <Card.Body>
                <Card.Title className="award-title">{award.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {award.award} | {award.date}
                </Card.Subtitle>
                <Card.Text>{award.description}</Card.Text>
                <Button
                  as="a"
                  href={`/awards/${award.file}`}
                  download
                  variant="primary"
                >
                  상장 다운로드하기
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};