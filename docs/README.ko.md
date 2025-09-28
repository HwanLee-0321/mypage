# Mypage - 개인 포트폴리오 웹사이트

이 프로젝트는 React와 TypeScript를 사용하여 제작된 개인 포트폴리오 웹사이트이며, 백엔드로는 Firebase를 사용합니다. 당신의 기술 스택, 경력, 학력, 자격증 및 게시물을 소개하는 페이지로 구성되어 있습니다.

| [페이지 방문하기](https://hwanlee-page.web.app/) | [English README](https://github.com/HwanLee-0321/mypage/blob/main/README.md) |

## 🌟 주요 기능

- **프로필 요약**: 이름, 직업, 연락처 등 기본 정보를 표시합니다.
- **자기소개**: 자신에 대한 상세한 소개를 제공합니다.
- **기술 스택**: 보유 기술을 아이콘과 함께 보여줍니다.
- **경력**: 업무 경험을 시간 순서대로 표시합니다.
- **학력**: 학력 정보를 보여줍니다.
- **자격증**: 취득한 자격증을 나열합니다.
- **게시물**: 블로그 게시물이나 글을 링크와 함께 보여줍니다.

## 🛠️ 사용된 기술

- **프론트엔드**: React, TypeScript, React-Bootstrap, Bootstrap
- **백엔드**: Firebase (Firestore)
- **라우팅**: React Router
- **아이콘**: Font Awesome
- **스타일링**: CSS, classnames
- **유틸리티**: moment

## 🚀 시작하기

로컬 환경에서 이 프로젝트를 실행하려면 다음 단계를 따르세요.

1.  **저장소 복제**
    ```bash
    git clone https://github.com/HwanLee-0321/mypage.git
    cd mypage
    ```

2.  **의존성 설치**
    ```bash
    npm install
    ```

3.  **환경 변수 설정**
    루트 디렉토리에 있는 `.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.
    ```bash
    cp .env.example .env
    ```
    그런 다음, 새로 생성된 `.env` 파일에 당신의 Firebase 프로젝트 설정 값을 입력합니다.

4.  **Firebase Admin 설정 (데이터 업로드용)**
    당신의 Firebase `serviceAccountKey.json` 파일을 프로젝트 디렉토리의 루트에 위치시킵니다. 이 파일은 데이터 업로드 스크립트를 실행하는 데 필요합니다.

5.  **초기 데이터 Firestore에 업로드**
    포트폴리오 데이터는 `src/assets/static`에 위치한 JSON 파일들에서 관리됩니다. 이 데이터를 Firestore 데이터베이스에 업로드하려면 다음 스크립트를 실행하세요:
    ```bash
    node scripts/uploadData.js
    ```

6.  **개발 서버 실행**
    ```bash
    npm start
    ```
    브라우저에서 `http://localhost:3000`에 접속하여 웹사이트를 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

- `npm start`: 개발 모드에서 앱을 실행합니다.
- `npm test`: 테스트를 실행합니다.
- `npm run build`: 프로덕션용으로 앱을 빌드합니다.
- `npm run eject`: Create React App 설정을 커스터마이징할 때 사용합니다.
- `node scripts/uploadData.js`: 로컬 JSON 파일(`src/assets/static`)의 포트폴리오 데이터를 Firestore에 업로드합니다.

## 📁 프로젝트 구조

```
mypage/
├── public/           # 정적 파일 (index.html, favicon 등)
├── src/
│   ├── assets/       # 이미지, 폰트, 정적 데이터 (json)
│   ├── components/   # 각 섹션별 React 컴포넌트
│   ├── utils/        # 유틸리티 함수
│   ├── App.tsx       # 메인 애플리케이션 컴포넌트
│   ├── index.js      # 애플리케이션 진입점
│   └── ...
├── scripts/
│   └── uploadData.js # Firestore에 데이터를 업로드하는 스크립트
├── .env.example      # 환경 변수 템플릿
├── serviceAccountKey.json # Firebase admin 인증 정보 (Git에 의해 무시됨)
├── package.json      # 프로젝트 의존성 및 스크립트 정보
└── tsconfig.json     # TypeScript 설정
```
