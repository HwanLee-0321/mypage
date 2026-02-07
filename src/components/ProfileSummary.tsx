import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Image } from "../utils/Image";
import './ProfileSummary.css';

interface HistoryItem {
  id: number;
  command: string;
  output: React.ReactNode;
}

export const ProfileSummary = () => {
  const { i18n } = useTranslation();
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Terminal State
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const fullText = "Welcome to Lee Jae-Hwan's Page";

  // Typing Effect
  useEffect(() => {
    setText("");
    setIsTypingComplete(false);
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [i18n.language]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, text, isTypingComplete]);

  // Focus input when typing is done
  useEffect(() => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTypingComplete]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode;

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="command-output info">
            <div>Available commands:</div>
            <div style={{ paddingLeft: '20px' }}>
              <div><span style={{ color: '#dcdcaa' }}>ls</span>       - List directory contents</div>
              <div><span style={{ color: '#dcdcaa' }}>cat</span>      - Concatenate and display files</div>
              <div><span style={{ color: '#dcdcaa' }}>whoami</span>   - Print effective user ID</div>
              <div><span style={{ color: '#dcdcaa' }}>clear</span>    - Clear the terminal screen</div>
            </div>
          </div>
        );
        break;
      case 'ls':
        output = (
          <div className="command-output success">
            <span style={{ marginRight: '15px' }}>about.md</span>
            <span style={{ marginRight: '15px' }}>experience.json</span>
            <span style={{ marginRight: '15px' }}>projects.json</span>
            <span style={{ marginRight: '15px' }}>skills.txt</span>
            <span style={{ marginRight: '15px' }}>contact.txt</span>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div className="command-output">
            <div>User: Visitor</div>
            <div>Role: Potential Collaborator / Recruiter</div>
            <div>Location: Internet</div>
            <div>Access Level: Guest</div>
          </div>
        );
        break;
      case 'cat about.md':
        output = (
          <div className="command-output">
            <div># About Me</div>
            <div>Passionate developer with a knack for building robust web applications.</div>
            <div>I love solving complex problems and learning new technologies.</div>
          </div>
        );
        break;
      case 'cat experience.json':
        output = (
          <div className="command-output json">
            <pre>{JSON.stringify([
              { company: "Ucube", role: "Junior Developer", period: "2024 - Present" },
              { company: "Chosun University", role: "Undergraduate Researcher", period: "2023 - 2024" }
            ], null, 2)}</pre>
          </div>
        );
        break;
      case 'cat projects.json':
        output = (
          <div className="command-output json">
            <pre>{JSON.stringify([
              { name: "MyPage", tech: ["React", "TypeScript", "Firebase"] },
              { name: "HackerLogin", tech: ["Security", "Web"] }
            ], null, 2)}</pre>
          </div>
        );
        break;
      case 'cat skills.txt':
        output = (
          <div className="command-output">
            <div>Frontend: React, TypeScript, HTML/CSS</div>
            <div>Backend: Node.js, Firebase</div>
            <div>Tools: Git, VS Code</div>
          </div>
        );
        break;
      case 'cat contact.txt':
        output = (
          <div className="command-output">
            <div>Email: woghk0321@gmail.com</div>
            <div>GitHub: github.com/HwanLee-0321</div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        output = null;
        break;
      default:
        if (trimmedCmd.startsWith('cat ')) {
          output = <div className="command-output error">cat: {trimmedCmd.split(' ')[1]}: No such file or directory</div>;
        } else {
          output = <div className="command-output error">command not found: {trimmedCmd}</div>;
        }
    }

    setHistory(prev => [...prev, { id: Date.now(), command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <Container className="profileSummary">
      <Row className="align-items-center">
        <Col xs={12} md={3} className="text-center">
          <div className="profileSummaryPicture">
            <Image name="profilePic.png" alt="Lee Jae-Hwan's profile picture" />
          </div>
        </Col>
        <Col xs={12} md={9}>
          <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button red"></span>
                <span className="terminal-button yellow"></span>
                <span className="terminal-button green"></span>
              </div>
              <div className="terminal-title">bash — 80x24</div>
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
              <div className="terminal-line">
                <span className="prompt">&gt; </span>
                {text}
                {!isTypingComplete && <span className={showCursor ? "cursor" : "cursor-hidden"}>|</span>}
              </div>

              {isTypingComplete && (
                <>
                  <div className="terminal-line" style={{ marginTop: '10px', color: '#888' }}>
                    Type 'help' to see available commands.
                  </div>
                  {history.map(item => (
                    <div key={item.id}>
                      <div className="terminal-line">
                        <span className="prompt">&gt; </span>
                        <span>{item.command}</span>
                      </div>
                      {item.output}
                    </div>
                  ))}
                  <div className="terminal-input-line">
                    <span className="prompt">&gt; </span>
                    <input
                      ref={inputRef}
                      type="text"
                      className="terminal-input"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                    <span className={showCursor ? "cursor" : "cursor-hidden"}>|</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
