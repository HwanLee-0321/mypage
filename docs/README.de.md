# Mypage - Persönliche Portfolio-Website

Dieses Projekt ist eine persönliche Portfolio-Website, die mit React und TypeScript erstellt wurde und Firebase für das Backend verwendet. Es zeigt Ihren Technologie-Stack, Ihre Karriere, Ihre Ausbildung, Ihre Zertifizierungen und Ihre Beiträge.

| [Seite besuchen](https://hwanlee-page.web.app/) | [Englisches README](https://github.com/HwanLee-0321/mypage/blob/main/README.md) |

## 🌟 Funktionen

- **Profilübersicht**: Zeigt grundlegende Informationen wie Name, Beruf und Kontaktinformationen an.
- **Über mich**: Bietet eine detaillierte Einführung über Sie.
- **Technologie-Stack**: Zeigt verfügbare Fähigkeiten mit Symbolen an.
- **Erfahrung**: Zeigt die Berufserfahrung in chronologischer Reihenfolge an.
- **Ausbildung**: Zeigt den Bildungshintergrund an.
- **Zertifizierungen**: Listet erworbene Zertifizierungen auf.
- **Beiträge**: Zeigt Blog-Beiträge oder Artikel mit Links an.

## 🛠️ Verwendete Technologien

- **Frontend**: React, TypeScript, React-Bootstrap, Bootstrap
- **Backend**: Firebase (Firestore)
- **Routing**: React Router
- **Symbole**: Font Awesome
- **Styling**: CSS, classnames
- **Dienstprogramme**: moment

## 🚀 Erste Schritte

Um dieses Projekt in Ihrer lokalen Umgebung auszuführen, befolgen Sie diese Schritte.

1.  **Klonen Sie das Repository**
    ```bash
    git clone https://github.com/HwanLee-0321/mypage.git
    cd mypage
    ```

2.  **Installieren Sie die Abhängigkeiten**
    ```bash
    npm install
    ```

3.  **Richten Sie Umgebungsvariablen ein**
    Erstellen Sie eine `.env`-Datei im Stammverzeichnis, indem Sie die `.env.example`-Datei kopieren.
    ```bash
    cp .env.example .env
    ```
    Füllen Sie dann die Konfigurationswerte Ihres Firebase-Projekts in der neuen `.env`-Datei aus.

4.  **Richten Sie Firebase Admin ein (für den Daten-Upload)**
    Legen Sie Ihre Firebase-`serviceAccountKey.json`-Datei im Stammverzeichnis des Projektverzeichnisses ab. Dies ist für das Daten-Upload-Skript erforderlich.

5.  **Laden Sie die Anfangsdaten in Firestore hoch**
    Die Portfolio-Daten werden in JSON-Dateien im Verzeichnis `src/assets/static` verwaltet. Um diese Daten in Ihre Firestore-Datenbank hochzuladen, führen Sie das folgende Skript aus:
    ```bash
    node scripts/uploadData.js
    ```

6.  **Führen Sie den Entwicklungsserver aus**
    ```bash
    npm start
    ```
    Sie können die Website anzeigen, indem Sie in Ihrem Browser auf `http://localhost:3000` zugreifen.

## 📜 Verfügbare Skripte

- `npm start`: Führt die App im Entwicklungsmodus aus.
- `npm test`: Führt die Tests aus.
- `npm run build`: Erstellt die App für die Produktion.
- `npm run eject`: Wird verwendet, um die Create React App-Konfiguration anzupassen.
- `node scripts/uploadData.js`: Lädt Portfolio-Daten aus lokalen JSON-Dateien (`src/assets/static`) in Firestore hoch.

## 📁 Projektstruktur

```
mypage/
├── public/           # Statische Dateien (index.html, favicon, etc.)
├── src/
│   ├── assets/       # Bilder, Schriftarten, statische Daten (json)
│   ├── components/   # React-Komponenten für jeden Abschnitt
│   ├── utils/        # Hilfsfunktionen
│   ├── App.tsx       # Hauptanwendungskomponente
│   ├── index.js      # Einstiegspunkt der Anwendung
│   └── ...
├── scripts/
│   └── uploadData.js # Skript zum Hochladen von Daten in Firestore
├── .env.example      # Vorlage für Umgebungsvariablen
├── serviceAccountKey.json # Firebase-Admin-Anmeldeinformationen (von Git ignoriert)
├── package.json      # Projektabhängigkeiten und Skriptinformationen
└── tsconfig.json     # TypeScript-Konfiguration
```
