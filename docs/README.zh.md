# Mypage - 个人作品集网站

该项目是一个使用 React 和 TypeScript 构建的个人作品集网站，后端使用 Firebase。它包含介绍您的技术栈、职业生涯、教育背景、证书和帖子的页面。

| [访问页面](https://hwanlee-page.web.app/) | [英文自述文件](https://github.com/HwanLee-0321/mypage/blob/main/README.md) |

## 🌟 功能

- **个人资料摘要**：显示姓名、职业和联系方式等基本信息。
- **关于我**：提供关于您自己的详细介绍。
- **技术栈**：用图标显示可用技能。
- **经历**：按时间顺序列出工作经历。
- **教育背景**：显示教育背景。
- **证书**：列出已获得的证书。
- **帖子**：显示博客文章或带有链接的文章。

## 🛠️ 使用的技术

- **前端**：React, TypeScript, React-Bootstrap, Bootstrap
- **后端**：Firebase (Firestore)
- **路由**：React Router
- **图标**：Font Awesome
- **样式**：CSS, classnames
- **实用工具**：moment

## 🚀 开始使用

要在您的本地环境中运行此项目，请按照以下步骤操作。

1.  **克隆存储库**
    ```bash
    git clone https://github.com/HwanLee-0321/mypage.git
    cd mypage
    ```

2.  **安装依赖项**
    ```bash
    npm install
    ```

3.  **设置环境变量**
    通过复制 `.env.example` 文件，在根目录中创建一个 `.env` 文件。
    ```bash
    cp .env.example .env
    ```
    然后，在新的 `.env` 文件中填写您的 Firebase 项目配置值。

4.  **设置 Firebase Admin（用于数据上传）**
    将您的 Firebase `serviceAccountKey.json` 文件放在项目目录的根目录下。这是数据上传脚本所必需的。

5.  **将初始数据上传到 Firestore**
    作品集数据在位于 `src/assets/static` 的 JSON 文件中进行管理。要将此数据上传到您的 Firestore 数据库，请运行以下脚本：
    ```bash
    node scripts/uploadData.js
    ```

6.  **运行开发服务器**
    ```bash
    npm start
    ```
    您可以通过在浏览器中访问 `http://localhost:3000` 来查看网站。

## 📜 可用脚本

- `npm start`：在开发模式下运行应用程序。
- `npm test`：运行测试。
- `npm run build`：为生产环境构建应用程序。
- `npm run eject`：用于自定义 Create React App 配置。
- `node scripts/uploadData.js`：将本地 JSON 文件 (`src/assets/static`) 中的作品集数据上传到 Firestore。

## 📁 项目结构

```
mypage/
├── public/           # 静态文件 (index.html, favicon 等)
├── src/
│   ├── assets/       # 图像、字体、静态数据 (json)
│   ├── components/   # 每个部分的 React 组件
│   ├── utils/        # 实用函数
│   ├── App.tsx       # 主应用程序组件
│   ├── index.js      # 应用程序入口点
│   └── ...
├── scripts/
│   └── uploadData.js # 用于将数据上传到 Firestore 的脚本
├── .env.example      # 环境变量模板
├── serviceAccountKey.json # Firebase 管理员凭据 (被 Git 忽略)
├── package.json      # 项目依赖项和脚本信息
└── tsconfig.json     # TypeScript 配置
```
