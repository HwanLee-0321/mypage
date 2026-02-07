import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { showResumePreview } from "../utils/pdfExport";
import "./ResumePreviewModal.css";

interface ResumePreviewModalProps {
    show: boolean;
    onHide: () => void;
    onDownload: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
    show,
    onHide,
    onDownload,
}) => {
    const { i18n } = useTranslation();
    const isKorean = i18n.language === "ko" || i18n.language.startsWith("ko");

    useEffect(() => {
        if (show) {
            // Load resume after modal is shown
            setTimeout(() => {
                showResumePreview();
            }, 100);
        }
    }, [show]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            centered
            className="resume-preview-modal"
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {isKorean ? "📄 이력서 미리보기" : "📄 Resume Preview"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="resume-preview-body">
                <div className="resume-preview-container" id="resume-preview-container">
                    {/* Resume component will be rendered here */}
                    <div id="resume-for-preview">
                        <div className="resume-preview-loading">
                            {isKorean ? "로딩 중" : "Loading"}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {isKorean ? "닫기" : "Close"}
                </Button>
                <Button variant="primary" onClick={onDownload}>
                    📥 {isKorean ? "PDF 다운로드" : "Download PDF"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
