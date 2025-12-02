import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../utils/localization";

interface Award {
  id?: string;
  title: any;
  award: any;
  date: string;
  description: any;
  file: string;
}

export const Awards = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("awards");
      if (data) {
        const awardsData = data as Award[];
        // Filter out duplicates based on title
        const uniqueAwards = awardsData.reduce((acc: Award[], current: Award) => {
          const x = acc.find(item => JSON.stringify(item.title) === JSON.stringify(current.title));
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setAwards(uniqueAwards);
      }
    };

    fetchData();
  }, []);

  if (awards.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>{t('awards')}</h2>
      <Row>
        {awards.map((award) => (
          <Col md={12} key={award.id}>
            <Card className="mb-4 award-card">
              <Card.Body>
                <Card.Title className="award-title">
                  {getLocalizedText(award.title, i18n.language)}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {getLocalizedText(award.award, i18n.language)} | {award.date}
                </Card.Subtitle>
                <Card.Text>
                  {getLocalizedText(award.description, i18n.language)}
                </Card.Text>
                <Button
                  as="a"
                  href={`/awards/${award.file}`}
                  download
                  variant="primary"
                  size="sm"
                >
                  {t('download_certificate')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};