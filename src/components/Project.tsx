import React, { useState, useEffect } from "react";
import { getData } from "../utils/dataExtractor"; // Import getData
import { Badge, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Define the project data type.
interface ProjectData {
  id?: string; // Add id for React key
  title: string;
  description: string;
  url?: string;
  tech?: string[];
  path?: string;
  post?: string;
  logo?: string;
  date?: string;
}

const Project = () => {
  const [projectList, setProjectList] = useState<ProjectData[]>([]);

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
      <h2 className="section-heading">Projects</h2>
      <div className="projects-grid">
        {projectList.map((project, projectIndex) => (
          <div
            key={project.id ?? `${project.title}-${projectIndex}`}
            className="project-card"
          >
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__description">{project.description}</p>

            {project.tech && project.tech.length > 0 && (
              <div className="project-card__badges">
                {project.tech.map((tech: string, i: number) => (
                  <Badge
                    color="primary"
                    key={`${project.title}-${tech}-${i}`}
                    className="project-card__badge"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

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
