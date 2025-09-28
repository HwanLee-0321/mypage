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
    <div className="container" id="project">
      <h1 className="font-weight-bold" style={{ textAlign: 'center' }}>Projects</h1>
      <hr className="divider" />
      {/* Add a flex container that wraps the entire project */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // Wrap to the next line if elements overflow the space
          justifyContent: "center", // Center horizontally
          gap: "2rem", // Gap between each project item
        }}
      >
        {projectList.map((project) => (
          // Style each project item
          <div
            key={project.id} // Use Firestore document id as key
            style={{
              flex: "1 1 45%", // Set width to display two items per row (max 45%)
              maxWidth: "45%", // Prevent width from exceeding 45%
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>{project.title}</h3>
            {/* Set the p tag to occupy all remaining space */}
            <p style={{ flexGrow: 1 }}>{project.description}</p>
            
            {project.tech && project.tech.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                {project.tech.map((tech: string, i: number) => (
                  <Badge color="primary" key={i} style={{ marginRight: "0.5rem" }}>
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
              >
                <FontAwesomeIcon icon={faGithub} /> View on GitHub
              </Button>
            )}
            {/* Remove individual separators as they are not needed in a grid layout. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;