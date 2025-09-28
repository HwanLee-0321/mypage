import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { getData } from '../utils/dataExtractor'; // Import getData

interface Skill {
  name: string;
  color: string;
}

interface SkillsData {
  [category: string]: Skill[];
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillsData>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("skills");
      // The data for 'skills' is a single document in an array
      if (data && data.length > 0) {
        // Remove the 'id' field before setting the state
        const skillsObject = { ...data[0] };
        delete (skillsObject as any).id;
        setSkills(skillsObject as unknown as SkillsData);
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
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '2rem' }}>Skills</h2>
      <Row>
        {Object.entries(skills).map(([category, skillList]) => (
          // Col의 md 속성을 6으로 변경하여 한 행에 2개씩 표시되도록 수정
          <Col key={category} xs={12} md={6} className="mb-4">
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title style={categoryTitleStyle}>{category}</Card.Title>
                <div>
                  {skillList.map((skill) => (
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