# Mypage - Sitio web de portafolio personal

Este proyecto es un sitio web de portafolio personal construido con React y TypeScript, con Firebase para el backend. Muestra tu pila de tecnología, carrera, educación, certificaciones y publicaciones.

| [Visitar página](https://hwanlee-page.web.app/) | [README en inglés](https://github.com/HwanLee-0321/mypage/blob/main/README.md) |

## 🌟 Características

- **Resumen del perfil**: Muestra información básica como nombre, ocupación e información de contacto.
- **Acerca de mí**: Proporciona una introducción detallada sobre ti.
- **Pila de tecnología**: Muestra las habilidades disponibles con iconos.
- **Experiencia**: Muestra la experiencia laboral en orden cronológico.
- **Educación**: Muestra la formación académica.
- **Certificaciones**: Enumera las certificaciones adquiridas.
- **Publicaciones**: Muestra publicaciones de blog o artículos con enlaces.

## 🛠️ Tecnologías utilizadas

- **Frontend**: React, TypeScript, React-Bootstrap, Bootstrap
- **Backend**: Firebase (Firestore)
- **Enrutamiento**: React Router
- **Iconos**: Font Awesome
- **Estilo**: CSS, classnames
- **Utilidades**: moment

## 🚀 Empezando

Para ejecutar este proyecto en tu entorno local, sigue estos pasos.

1.  **Clona el repositorio**
    ```bash
    git clone https://github.com/HwanLee-0321/mypage.git
    cd mypage
    ```

2.  **Instala las dependencias**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno**
    Crea un archivo `.env` en el directorio raíz copiando el archivo `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Luego, completa los valores de configuración de tu proyecto de Firebase en el nuevo archivo `.env`.

4.  **Configura Firebase Admin (para la carga de datos)**
    Coloca tu archivo `serviceAccountKey.json` de Firebase en la raíz del directorio del proyecto. Esto es necesario para el script de carga de datos.

5.  **Carga los datos iniciales a Firestore**
    Los datos del portafolio se gestionan en archivos JSON ubicados en `src/assets/static`. Para cargar estos datos a tu base de datos de Firestore, ejecuta el siguiente script:
    ```bash
    node scripts/uploadData.js
    ```

6.  **Ejecuta el servidor de desarrollo**
    ```bash
    npm start
    ```
    Puedes ver el sitio web accediendo a `http://localhost:3000` en tu navegador.

## 📜 Scripts disponibles

- `npm start`: Ejecuta la aplicación en modo de desarrollo.
- `npm test`: Ejecuta las pruebas.
- `npm run build`: Compila la aplicación para producción.
- `npm run eject`: Se utiliza para personalizar la configuración de Create React App.
- `node scripts/uploadData.js`: Carga los datos del portafolio desde archivos JSON locales (`src/assets/static`) a Firestore.

## 📁 Estructura del proyecto

```
mypage/
├── public/           # Archivos estáticos (index.html, favicon, etc.)
├── src/
│   ├── assets/       # Imágenes, fuentes, datos estáticos (json)
│   ├── components/   # Componentes de React para cada sección
│   ├── utils/        # Funciones de utilidad
│   ├── App.tsx       # Componente principal de la aplicación
│   ├── index.js      # Punto de entrada de la aplicación
│   └── ...
├── scripts/
│   └── uploadData.js # Script para cargar datos a Firestore
├── .env.example      # Plantilla de variables de entorno
├── serviceAccountKey.json # Credenciales de administrador de Firebase (ignorado por Git)
├── package.json      # Dependencias del proyecto e información de scripts
└── tsconfig.json     # Configuración de TypeScript
```
