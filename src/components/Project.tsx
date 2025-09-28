import React, { useState, useEffect } from "react";
import { getData } from "../utils/dataExtractor"; // Import getData
import { Badge, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// 프로젝트 데이터 타입을 정의합니다.
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
      {/* 전체 프로젝트를 감싸는 flex 컨테이너 추가 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // 요소들이 공간을 넘어가면 다음 줄로 넘김
          justifyContent: "center", // 가로 방향 가운데 정렬
          gap: "2rem", // 각 프로젝트 아이템 사이의 간격
        }}
      >
        {projectList.map((project) => (
          // 각 프로젝트 아이템 스타일링
          <div
            key={project.id} // Use Firestore document id as key
            style={{
              flex: "1 1 45%", // 한 줄에 2개씩 표시되도록 너비 설정 (최대 45%)
              maxWidth: "45%", // 너비가 45%를 초과하지 않도록 함
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>{project.title}</h3>
            {/* p 태그가 남은 공간을 모두 차지하도록 설정 */}
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
            {/* 그리드 레이아웃에서는 개별 구분선이 필요 없으므로 제거합니다. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;