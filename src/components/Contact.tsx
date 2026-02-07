import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faMapMarkerAlt,
    faDownload,
    faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { downloadResumeAsPDF } from "../utils/pdfExport";
import { ResumePreviewModal } from "./ResumePreviewModal";
import "./Contact.css";

export const Contact: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isKorean = i18n.language === 'ko' || i18n.language.startsWith('ko');
    const [showPreview, setShowPreview] = React.useState(false);

    const handleEmailClick = () => {
        window.location.href = "mailto:woghk0321@gmail.com";
    };

    const handleResumePreview = () => {
        // Show modal first, then load resume after modal is rendered
        setShowPreview(true);
    };

    const handleResumeDownload = async () => {
        const lang = isKorean ? 'ko' : 'en';
        await downloadResumeAsPDF(lang);
        setShowPreview(false);
    };

    return (
        <section className="contact-section">
            <Container>
                <h2 className="section-title">
                    {isKorean ? "📧 연락하기" : "📧 Get in Touch"}
                </h2>
                <p className="section-subtitle">
                    {isKorean
                        ? "함께 일하고 싶으시다면 언제든 연락주세요!"
                        : "Feel free to reach out if you'd like to work together!"}
                </p>

                <Row className="contact-grid">
                    {/* Email Card */}
                    <Col md={6} lg={4} className="mb-4">
                        <Card className="contact-card">
                            <Card.Body className="text-center">
                                <div className="contact-icon">
                                    <FontAwesomeIcon icon={faEnvelope as any} />
                                </div>
                                <h5 className="contact-title">Email</h5>
                                <a
                                    href="mailto:woghk0321@gmail.com"
                                    className="contact-link"
                                >
                                    woghk0321@gmail.com
                                </a>
                                <br />
                                <a
                                    href="mailto:ghksdl6026@naver.com"
                                    className="contact-link"
                                >
                                    ghksdl6026@naver.com
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* GitHub Card */}
                    <Col md={6} lg={4} className="mb-4">
                        <Card className="contact-card">
                            <Card.Body className="text-center">
                                <div className="contact-icon">
                                    <FontAwesomeIcon icon={faGithub} />
                                </div>
                                <h5 className="contact-title">GitHub</h5>
                                <a
                                    href="https://github.com/HwanLee-0321"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    HwanLee-0321
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Google Scholar Card */}
                    <Col md={6} lg={4} className="mb-4">
                        <Card className="contact-card">
                            <Card.Body className="text-center">
                                <div className="contact-icon">
                                    <FontAwesomeIcon icon={faGraduationCap as any} />
                                </div>
                                <h5 className="contact-title">Google Scholar</h5>
                                <a
                                    href="https://scholar.google.com/citations?user=GnqbP2gAAAAJ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    {isKorean ? "학술 프로필" : "Academic Profile"}
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Location Card */}
                    <Col md={6} lg={4} className="mb-4">
                        <Card className="contact-card">
                            <Card.Body className="text-center">
                                <div className="contact-icon">
                                    <FontAwesomeIcon icon={faMapMarkerAlt as any} />
                                </div>
                                <h5 className="contact-title">
                                    {isKorean ? "위치" : "Location"}
                                </h5>
                                <p className="contact-text">
                                    {isKorean ? "광주, 대한민국" : "Gwangju, South Korea"}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Velog Card */}
                    <Col md={6} lg={4} className="mb-4">
                        <Card className="contact-card">
                            <Card.Body className="text-center">
                                <div className="contact-icon">
                                    📝
                                </div>
                                <h5 className="contact-title">Velog</h5>
                                <a
                                    href="https://velog.io/@hwan_lee"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                    @hwan_lee
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* CTA Buttons */}
                <Row className="cta-buttons mt-5">
                    <Col className="text-center">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleEmailClick}
                            className="mx-2 mb-3"
                        >
                            <FontAwesomeIcon icon={faEnvelope as any} className="me-2" />
                            {isKorean ? "이메일 보내기" : "Send Email"}
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={handleResumePreview}
                            className="mx-2 mb-3"
                        >
                            <FontAwesomeIcon icon={faDownload as any} className="me-2" />
                            {isKorean ? "이력서 미리보기" : "Preview Resume"}
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Resume Preview Modal */}
            <ResumePreviewModal
                show={showPreview}
                onHide={() => setShowPreview(false)}
                onDownload={handleResumeDownload}
            />
        </section>
    );
};
