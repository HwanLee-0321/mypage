# Mypage - 개인 포트폴리오 웹사이트

이 프로젝트는 React와 TypeScript를 사용하여 제작된 개인 포트폴리오 웹사이트입니다. 자신의 기술 스택, 경력, 학력, 자격증 및 포스트를 소개하는 페이지로 구성되어 있습니다.

## 🌟 주요 기능

- **프로필 요약**: 이름, 직업, 연락처 등 기본 정보를 보여줍니다.
- **자기소개**: 자신에 대한 상세한 소개를 확인할 수 있습니다.
- **기술 스택**: 사용 가능한 기술들을 아이콘과 함께 보여줍니다.
- **경력**: 지금까지의 업무 경력을 시간 순으로 표시합니다.
- **학력**: 학력 정보를 확인할 수 있습니다.
- **자격증**: 취득한 자격증 목록을 보여줍니다.
- **포스트**: 작성한 블로그 포스트나 글을 링크와 함께 보여줍니다.

## 🛠️ 사용된 기술

- **Frontend**: React, TypeScript, React-Bootstrap, Bootstrap
- **Routing**: React Router
- **Icons**: Font Awesome
- **Styling**: CSS, classnames
- **Utilities**: moment

## 🚀 프로젝트 시작하기

이 프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

1.  **저장소 복제**
    ```bash
    git clone https://github.com/your-username/mypage.git
    cd mypage
    ```

2.  **의존성 설치**
    ```bash
    npm install
    ```

3.  **개발 서버 실행**
    ```bash
    npm start
    ```
    브라우저에서 `http://localhost:3000` 주소로 접속하여 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

- `npm start`: 개발 모드로 앱을 실행합니다.
- `npm test`: 테스트를 실행합니다.
- `npm run build`: 프로덕션용으로 앱을 빌드합니다.
- `npm run eject`: Create React App의 설정을 커스터마이징하기 위해 사용합니다.

## 📁 프로젝트 구조

```
mypage/
├── public/           # 정적 파일 (index.html, favicon 등)
├── src/
│   ├── assets/       # 이미지, 폰트, 정적 데이터(json)
│   ├── components/   # 각 섹션을 구성하는 React 컴포넌트
│   ├── utils/        # 유틸리티 함수
│   ├── App.tsx       # 메인 애플리케이션 컴포넌트
│   ├── index.js      # 애플리케이션 진입점
│   └── ...
├── package.json      # 프로젝트 의존성 및 스크립트 정보
└── tsconfig.json     # TypeScript 설정
```