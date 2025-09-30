# Mypage - Personal Portfolio Website

This project is a personal portfolio website built using React and TypeScript, with Firebase for the backend. It showcases your tech stack, career, education, certifications, and posts. | [Visit Page](https://hwanlee.site/) |

<p align="center">
  <b><a href="./README.md">English</a></b> |
  <b><a href="./docs/README.ko.md">한국어</a></b> |
  <b><a href="./docs/README.zh.md">中文</a></b> |
  <b><a href="./docs/README.ja.md">日本語</a></b> |
  <b><a href="./docs/README.es.md">Español</a></b> |
  <b><a href="./docs/README.de.md">Deutsch</a></b> |
  <b><a href="./docs/README.ar.md">العربية</a></b>
</p>

| [Visit Page](https://hwanlee.site/) |

## 🌟 Features

- **Profile Summary**: Displays basic information such as name, occupation, and contact information.
- **About Me**: Provides a detailed introduction about yourself.
- **Tech Stack**: Shows available skills with icons.
- **Experience**: Displays work experience in chronological order.
- **Education**: Shows educational background.
- **Certifications**: Lists acquired certifications.
- **Posts**: Shows blog posts or articles with links.

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, React-Bootstrap, Bootstrap
- **Backend**: Firebase (Firestore)
- **Routing**: React Router
- **Icons**: Font Awesome
- **Styling**: CSS, classnames
- **Utilities**: moment

## 🚀 Getting Started

To run this project in your local environment, follow these steps.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/HwanLee-0321/mypage.git
    cd mypage
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory by copying the `.env.example` file.
    ```bash
    cp .env.example .env
    ```
    Then, fill in your Firebase project configuration values in the new `.env` file.

4.  **Set up Firebase Admin (for data upload)**
    Place your Firebase `serviceAccountKey.json` file in the root of the project directory. This is required for the data upload script.

5.  **Upload initial data to Firestore**
    The portfolio data is managed in JSON files located in `src/assets/static`. To upload this data to your Firestore database, run the following script:
    ```bash
    node scripts/uploadData.js
    ```

6.  **Run the development server**
    ```bash
    npm start
    ```
    You can view the website by accessing `http://localhost:3000` in your browser.

## 📜 Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Runs the tests.
- `npm run build`: Builds the app for production.
- `npm run eject`: Used to customize the Create React App configuration.
- `node scripts/uploadData.js`: Uploads portfolio data from local JSON files (`src/assets/static`) to Firestore.

## 📁 Project Structure

```
mypage/
├── public/           # Static files (index.html, favicon, etc.)
├── src/
│   ├── assets/       # Images, fonts, static data (json)
│   ├── components/   # React components for each section
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main application component
│   ├── index.js      # Application entry point
│   └── ...
├── scripts/
│   └── uploadData.js # Script to upload data to Firestore
├── .env.example      # Environment variable template
├── serviceAccountKey.json # Firebase admin credentials (ignored by Git)
├── package.json      # Project dependencies and script information
└── tsconfig.json     # TypeScript configuration
```
