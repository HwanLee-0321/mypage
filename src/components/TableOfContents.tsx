import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./TableOfContents.css";

interface TocItem {
    id: string;
    label: { ko: string; en: string };
    icon: string;
}

const tocItems: TocItem[] = [
    { id: "profile", label: { ko: "프로필", en: "Profile" }, icon: "👤" },
    { id: "skills", label: { ko: "기술", en: "Skills" }, icon: "💻" },
    { id: "certifications", label: { ko: "자격증", en: "Certifications" }, icon: "📜" },
    { id: "projects", label: { ko: "프로젝트", en: "Projects" }, icon: "🚀" },
    { id: "experience", label: { ko: "경력", en: "Experience" }, icon: "💼" },
    { id: "education", label: { ko: "학력", en: "Education" }, icon: "🎓" },
    { id: "about", label: { ko: "소개", en: "About" }, icon: "ℹ️" },
    { id: "contact", label: { ko: "연락", en: "Contact" }, icon: "📧" },
];

export const TableOfContents: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>("profile");
    const { i18n } = useTranslation();
    const isKorean = i18n.language === 'ko' || i18n.language.startsWith('ko');

    useEffect(() => {
        const handleScroll = () => {
            // Find active section
            const sections = tocItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(tocItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="table-of-contents">
            <div className="toc-title">
                {isKorean ? "목차" : "Contents"}
            </div>
            <ul className="toc-list">
                {tocItems.map((item) => (
                    <li
                        key={item.id}
                        className={`toc-item ${activeSection === item.id ? "active" : ""}`}
                        onClick={() => scrollToSection(item.id)}
                    >
                        <span className="toc-icon">{item.icon}</span>
                        <span className="toc-label">
                            {isKorean ? item.label.ko : item.label.en}
                        </span>
                    </li>
                ))}
            </ul>
            <div className="toc-progress-bar">
                <div
                    className="toc-progress-fill"
                    style={{
                        height: `${((tocItems.findIndex(item => item.id === activeSection) + 1) / tocItems.length) * 100}%`
                    }}
                />
            </div>
        </nav>
    );
};
