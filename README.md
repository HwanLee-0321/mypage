# Mypage - Personal Portfolio Website

This project is a personal portfolio website built using React and TypeScript. It consists of pages introducing your tech stack, career, education, certifications, and posts.

[Visit Page](https://hwanlee-page.web.app/)  

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
- **Routing**: React Router
- **Icons**: Font Awesome
- **Styling**: CSS, classnames
- **Utilities**: moment

## 🚀 Getting Started

To run this project in your local environment, follow these steps.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/mypage.git
    cd mypage
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm start
    ```
    You can check the website by accessing `http://localhost:3000` in your browser.

## 📜 Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Runs the tests.
- `npm run build`: Builds the app for production.
- `npm run eject`: Used to customize the Create React App configuration.

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
├── package.json      # Project dependencies and script information
└── tsconfig.json     # TypeScript configuration
```