import React, { useState, useEffect } from "react";
import { getData } from "../utils/dataExtractor"; // Import getData
import { Badge, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../utils/localization";

// Define the project data type.
interface ProjectData {
  id?: string; // Add id for React key
  title: any;
  description: any;
  url?: string;
  tech?: string[];
  path?: string;
  post?: string;
  logo?: string;
  date?: string;
}

const Project = () => {
  const [projectList, setProjectList] = useState<ProjectData[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("projects");
      if (data) {
        setProjectList(data as ProjectData[]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container projects-section" id="project">
      <h2 className="section-heading">{t('projects')}</h2>
      <div className="projects-grid">
        {projectList.map((project, projectIndex) => (
          <div
            key={project.id ?? `${project.title}-${projectIndex}`}
            className="project-card"
          >
            <h3 className="project-card__title">{getLocalizedText(project.title, i18n.language)}</h3>
            <p className="project-card__description">{getLocalizedText(project.description, i18n.language)}</p>



            {project.url && (
              <Button
                color="secondary"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__action"
              >
                <FontAwesomeIcon icon={faGithub} /> View on GitHub
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
