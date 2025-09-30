# Mypage - 個人ポートフォリオウェブサイト

このプロジェクトは、ReactとTypeScriptを使用して構築された個人ポートフォリオウェブサイトで、バックエンドにはFirebaseを使用しています。あなたの技術スタック、経歴、学歴、資格、投稿を紹介するページで構成されています。

| [ページにアクセス](https://hwanlee.site/) | [英語のREADME](https://github.com/HwanLee-0321/mypage/blob/main/README.md) |

## 🌟 特徴

- **プロフィール概要**：氏名、職業、連絡先などの基本情報を表示します。
- **自己紹介**：あなたについての詳細な紹介を提供します。
- **技術スタック**：利用可能なスキルをアイコンで表示します。
- **職務経歴**：職務経歴を時系列で表示します。
- **学歴**：学歴を表示します。
- **資格**：取得した資格を一覧表示します。
- **投稿**：ブログの投稿や記事をリンク付きで表示します。

## 🛠️ 使用技術

- **フロントエンド**：React, TypeScript, React-Bootstrap, Bootstrap
- **バックエンド**：Firebase (Firestore)
- **ルーティング**：React Router
- **アイコン**：Font Awesome
- **スタイリング**：CSS, classnames
- **ユーティリティ**：moment

## 🚀はじめに

ローカル環境でこのプロジェクトを実行するには、次の手順に従ってください。

1.  **リポジトリをクローンする**
    ```bash
    git clone https://github.com/HwanLee-0321/mypage.git
    cd mypage
    ```

2.  **依存関係をインストールする**
    ```bash
    npm install
    ```

3.  **環境変数を設定する**
    `.env.example` ファイルをコピーして、ルートディレクトリに `.env` ファイルを作成します。
    ```bash
    cp .env.example .env
    ```
    次に、新しい `.env` ファイルにあなたのFirebaseプロジェクトの設定値を入力します。

4.  **Firebase Adminを設定する（データアップロード用）**
    Firebaseの `serviceAccountKey.json` ファイルをプロジェクトディレクトリのルートに配置します。これはデータアップロードスクリプトに必要です。

5.  **初期データをFirestoreにアップロードする**
    ポートフォリオデータは `src/assets/static` にあるJSONファイルで管理されています。このデータをFirestoreデータベースにアップロードするには、次のスクリプトを実行します。
    ```bash
    node scripts/uploadData.js
    ```

6.  **開発サーバーを実行する**
    ```bash
    npm start
    ```
    ブラウザで `http://localhost:3000` にアクセスしてウェブサイトを表示できます。

## 📜利用可能なスクリプト

- `npm start`：開発モードでアプリを実行します。
- `npm test`：テストを実行します。
- `npm run build`：本番用にアプリをビルドします。
- `npm run eject`：Create React Appの設定をカスタマイズするために使用します。
- `node scripts/uploadData.js`：ローカルのJSONファイル（`src/assets/static`）からポートフォリオデータをFirestoreにアップ로드합니다.

## 📁 プロジェクト構造

```
mypage/
├── public/           # 静的ファイル (index.html, faviconなど)
├── src/
│   ├── assets/       # 画像、フォント、静的データ (json)
│   ├── components/   # 各セクションのReactコンポーネント
│   ├── utils/        # ユーティリティ関数
│   ├── App.tsx       # メインアプリケーションコンポーネント
│   ├── index.js      # アプリケーションのエントリーポイント
│   └── ...
├── scripts/
│   └── uploadData.js # Firestoreにデータをアップロードするスクリプト
├── .env.example      # 環境変数テンプレート
├── serviceAccountKey.json # Firebase管理者認証情報（Gitによって無視される）
├── package.json      # プロジェクトの依存関係とスクリプト情報
└── tsconfig.json     # TypeScript設定
```
