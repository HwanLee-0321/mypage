import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { getData } from '../utils/dataExtractor'; // Import getData
import { useTranslation } from 'react-i18next';
import { getLocalizedText } from "../utils/localization";

interface Skill {
  name: string;
  color: string;
}

interface SkillCategory {
  category: any;
  items: Skill[];
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("skills");
      // The data for 'skills' is now an array of SkillCategory objects
      if (data && data.length > 0) {
        // Filter out any data that doesn't match the expected structure (e.g. old data)
        const validSkills = data.filter((item: any) => item && Array.isArray(item.items)) as unknown as SkillCategory[];
        setSkills(validSkills);
      }
    };

    fetchData();
  }, []);

  const containerStyle: React.CSSProperties = {
    padding: '2rem 0',
    width: '100%'
  };

  const categoryTitleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: 'white'
  };

  const getBadgeStyle = (color: string): React.CSSProperties => {
    const lightColors = ["#F7DF1E", "#FFCA28"];
    const textColor = lightColors.includes(color) ? '#000000' : '#FFFFFF';
    return {
      display: 'inline-block',
      margin: '0.125rem',
      padding: '0.3rem 0.8rem',
      fontSize: '0.9rem',
      fontWeight: '500',
      backgroundColor: color,
      color: textColor,
      borderRadius: '8px'
    };
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '2rem' }}>{t('skills')}</h2>
      <Row>
        {skills.map((skillCategory, index) => (
          <Col key={index} xs={12} md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title style={categoryTitleStyle}>
                  {getLocalizedText(skillCategory.category, i18n.language)}
                </Card.Title>
                <div>
                  {skillCategory.items.map((skill) => (
                    <span key={skill.name} style={getBadgeStyle(skill.color)}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Skills;