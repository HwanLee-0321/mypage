import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getData } from "../utils/dataExtractor";
import { getLocalizedText } from "../utils/localization";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "./Resume.css";

interface Skill {
    name: string;
    color: string;
}

interface SkillCategory {
    category: any;
    items: Skill[];
}

interface ExperienceRole {
    title: any;
    startDate: string;
    endDate: string;
    Present: boolean;
    location: any;
}

interface ExperienceData {
    id: string;
    companyName: any;
    url: string;
    logo: string;
    roles: ExperienceRole[];
}

interface ProjectData {
    id?: string;
    title: any;
    description: any;
    url?: string;
    tech?: string[];
}

interface Study {
    institute: any;
    title: any;
    durationInYears: any;
    graduationYear: number;
}

interface EducationData {
    studies: Study[];
}

export const Resume: React.FC = () => {
    const { i18n } = useTranslation();
    const isKorean = i18n.language === 'ko' || i18n.language.startsWith('ko');

    const [skills, setSkills] = useState<SkillCategory[]>([]);
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [education, setEducation] = useState<EducationData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const [skillsData, expData, projData, eduData] = await Promise.all([
                getData("skills"),
                getData("experience"),
                getData("projects"),
                getData("education"),
            ]);

            if (skillsData) setSkills(skillsData as unknown as SkillCategory[]);
            if (expData) setExperiences(expData as ExperienceData[]);
            if (projData) setProjects(projData as ProjectData[]);
            if (eduData && eduData.length > 0) setEducation(eduData[0] as unknown as EducationData);
        };

        fetchData();
    }, []);

    return (
        <div className="resume-container" id="resume">
            {/* Header */}
            <header className="resume-header">
                <h1 className="resume-name">
                    Lee Jae Hwan <span className="resume-korean">(이재환)</span>
                </h1>
                <div className="resume-contact-info">
                    <span>📧 woghk0321@gmail.com</span>
                    <span>|</span>
                    <span>📱 ghksdl6026@naver.com</span>
                    <span>|</span>
                    <span>📍 {isKorean ? "광주, 대한민국" : "Gwangju, South Korea"}</span>
                </div>
                <div className="resume-links">
                    <a href="https://github.com/HwanLee-0321" target="_blank" rel="noopener noreferrer">
                        GitHub: HwanLee-0321
                    </a>
                    <span>|</span>
                    <a href="https://scholar.google.com/citations?user=GnqbP2gAAAAJ" target="_blank" rel="noopener noreferrer">
                        Google Scholar
                    </a>
                    <span>|</span>
                    <a href="https://velog.io/@hwan_lee" target="_blank" rel="noopener noreferrer">
                        Velog: @hwan_lee
                    </a>
                </div>
            </header>

            <Container className="resume-content">
                {/* Professional Summary */}
                <section className="resume-section">
                    <h2 className="resume-section-title">
                        {isKorean ? "전문 요약" : "Professional Summary"}
                    </h2>
                    <p className="resume-summary">
                        {isKorean
                            ? "조선대학교 컴퓨터공학부 출신 풀스택 개발자. React, Node.js, TypeScript를 활용한 웹 개발을 전문으로 하며, Firebase를 이용한 백엔드 구축 경험 보유. 보안 및 알고리즘 대회 수상 경력 다수. 학술 연구 경험을 바탕으로 이론과 실무를 겸비한 소프트웨어 엔지니어."
                            : "Full Stack Developer with expertise in React, Node.js, and TypeScript. Experienced in building scalable web applications with Firebase backend. Multiple awards in security and algorithm competitions. Software engineer with strong academic background combining theory and practice."}
                    </p>
                </section>

                {/* Skills */}
                <section className="resume-section">
                    <h2 className="resume-section-title">
                        {isKorean ? "기술 스택" : "Technical Skills"}
                    </h2>
                    <Row>
                        {skills.map((skillCategory, index) => (
                            <Col xs={12} md={6} key={index} className="mb-3">
                                <div className="resume-skill-category">
                                    <h4 className="resume-skill-category-title">
                                        {getLocalizedText(skillCategory.category, i18n.language)}
                                    </h4>
                                    <div className="resume-skill-items">
                                        {skillCategory.items.map((skill) => (
                                            <span key={skill.name} className="resume-skill-badge">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Experience */}
                <section className="resume-section">
                    <h2 className="resume-section-title">
                        {isKorean ? "경력" : "Experience"}
                    </h2>
                    {experiences.map((exp) => (
                        <div key={exp.id} className="resume-experience-item">
                            <h3 className="resume-company-name">
                                {getLocalizedText(exp.companyName, i18n.language)}
                            </h3>
                            {exp.roles.map((role, idx) => {
                                const startDate = moment(role.startDate);
                                const endDate = role.Present ? moment() : moment(role.endDate);
                                const duration = moment.duration(endDate.diff(startDate));
                                const months = Math.round(duration.asMonths());
                                const years = Math.floor(months / 12);
                                const remainingMonths = months % 12;

                                let durationText = "";
                                if (years > 0) durationText += `${years}${isKorean ? "년" : " year"}${years > 1 ? "s" : ""} `;
                                if (remainingMonths > 0) durationText += `${remainingMonths}${isKorean ? "개월" : " month"}${remainingMonths > 1 ? "s" : ""}`;

                                return (
                                    <div key={idx} className="resume-role">
                                        <div className="resume-role-header">
                                            <span className="resume-role-title">
                                                {getLocalizedText(role.title, i18n.language)}
                                            </span>
                                            <span className="resume-role-date">
                                                {startDate.format("MMM YYYY")} - {role.Present ? (isKorean ? "현재" : "Present") : endDate.format("MMM YYYY")}
                                                {" "}({durationText})
                                            </span>
                                        </div>
                                        <div className="resume-role-location">
                                            {getLocalizedText(role.location, i18n.language)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </section>

                {/* Projects */}
                <section className="resume-section">
                    <h2 className="resume-section-title">
                        {isKorean ? "주요 프로젝트" : "Projects"}
                    </h2>
                    {projects.slice(0, 5).map((project, index) => (
                        <div key={project.id || index} className="resume-project-item">
                            <h3 className="resume-project-title">
                                {getLocalizedText(project.title, i18n.language)}
                                {project.url && (
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="resume-project-link">
                                        {" "}[GitHub]
                                    </a>
                                )}
                            </h3>
                            <p className="resume-project-description">
                                {getLocalizedText(project.description, i18n.language)}
                            </p>
                            {project.tech && (
                                <div className="resume-project-tech">
                                    <strong>{isKorean ? "기술:" : "Tech:"}</strong>{" "}
                                    {project.tech.join(", ")}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* Education */}
                <section className="resume-section">
                    <h2 className="resume-section-title">
                        {isKorean ? "학력" : "Education"}
                    </h2>
                    {education?.studies.map((study, index) => (
                        <div key={index} className="resume-education-item">
                            <h3 className="resume-education-title">
                                {getLocalizedText(study.institute, i18n.language)}
                            </h3>
                            <div className="resume-education-details">
                                <span className="resume-education-degree">
                                    {getLocalizedText(study.title, i18n.language)}
                                </span>
                                <span className="resume-education-year">
                                    {isKorean ? "졸업:" : "Graduation:"} {study.graduationYear}
                                </span>
                            </div>
                            <div className="resume-education-duration">
                                {getLocalizedText(study.durationInYears, i18n.language)}
                            </div>
                        </div>
                    ))}
                </section>
            </Container>
        </div>
    );
};
