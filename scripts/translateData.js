const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/assets/static');
const files = ['awards', 'education', 'experience', 'projects', 'skills', 'certifications'];

const languages = ['ko', 'en', 'ja', 'zh', 'de', 'es', 'ar', 'it', 'fr'];

// Dictionary mapping "Korean Source Text" (or the text found in the 'ko' field) to translations
const dictionary = {
    // Awards
    "2025 오픈소스 아이디어 경진대회 상장(동상)": {
        ko: "2025 오픈소스 아이디어 경진대회 상장(동상)",
        en: "2025 Open Source Idea Competition Award (Bronze)",
        ja: "2025年オープンソースアイデアコンテスト賞（銅賞）",
        zh: "2025年开源创意大赛奖（铜奖）",
        de: "2025 Open Source Ideenwettbewerb Auszeichnung (Bronze)",
        es: "Premio del Concurso de Ideas de Código Abierto 2025 (Bronce)",
        ar: "جائزة مسابقة أفكار المصدر المفتوح 2025 (برونزية)",
        it: "Premio Concorso Idee Open Source 2025 (Bronzo)",
        fr: "Prix du concours d'idées Open Source 2025 (Bronze)"
    },
    "동상": {
        ko: "동상", en: "Bronze Award", ja: "銅賞", zh: "铜奖", de: "Bronze-Auszeichnung", es: "Premio de Bronce", ar: "الجائزة البرونزية", it: "Premio di Bronzo", fr: "Prix de Bronze"
    },
    "조선대학교 차세대 보안 연구실 학부 연구 활동 증명서": {
        ko: "조선대학교 차세대 보안 연구실 학부 연구 활동 증명서",
        en: "Certificate of Undergraduate Research Activity at Chosun University Next Generation Security Lab",
        ja: "朝鮮大学校次世代セキュリティ研究室学部研究活動証明書",
        zh: "朝鲜大学下一代安全实验室本科研究活动证书",
        de: "Zertifikat über Forschungsaktivitäten im Grundstudium am Next Generation Security Lab der Chosun University",
        es: "Certificado de Actividad de Investigación de Pregrado en el Laboratorio de Seguridad de Próxima Generación de la Universidad de Chosun",
        ar: "شهادة نشاط البحث الجامعي في مختبر الأمن للجيل القادم بجامعة تشوسون",
        it: "Certificato di Attività di Ricerca Universitaria presso il Laboratorio di Sicurezza di Nuova Generazione dell'Università di Chosun",
        fr: "Certificat d'activité de recherche de premier cycle au laboratoire de sécurité de nouvelle génération de l'Université Chosun"
    },
    "DX (경험적 경험) AI 실무 역량 강화 부트캠프 과정": {
        ko: "DX (경험적 경험) AI 실무 역량 강화 부트캠프 과정",
        en: "DX (Empirical Experience) AI Practical Competency Enhancement Bootcamp Course",
        ja: "DX（経験的体験）AI実践能力強化ブートキャンプコース",
        zh: "DX（经验体验）AI实战能力强化训练营课程",
        de: "DX (Empirische Erfahrung) AI Praxiskompetenz-Verbesserungs-Bootcamp-Kurs",
        es: "Curso Bootcamp de Mejora de Competencias Prácticas de IA DX (Experiencia Empírica)",
        ar: "دورة معسكر تعزيز الكفاءة العملية للذكاء الاصطناعي DX (التجربة التجريبية)",
        it: "Corso Bootcamp di Potenziamento delle Competenze Pratiche AI DX (Esperienza Empirica)",
        fr: "Cours Bootcamp d'amélioration des compétences pratiques en IA DX (Expérience empirique)"
    },
    "우수상": {
        ko: "우수상", en: "Excellence Award", ja: "優秀賞", zh: "优秀奖", de: "Exzellenzpreis", es: "Premio a la Excelencia", ar: "جائزة التميز", it: "Premio di Eccellenza", fr: "Prix d'Excellence"
    },
    "노인 복약 관리 앱": {
        ko: "노인 복약 관리 앱",
        en: "Elderly Medication Management App",
        ja: "高齢者服薬管理アプリ",
        zh: "老年人用药管理应用程序",
        de: "App zur Medikamentenverwaltung für ältere Menschen",
        es: "Aplicación de gestión de medicamentos para ancianos",
        ar: "تطبيق إدارة الأدوية لكبار السن",
        it: "App per la gestione dei farmaci per anziani",
        fr: "Application de gestion des médicaments pour les personnes âgées"
    },
    "수료증": {
        ko: "수료증", en: "Certificate of Completion", ja: "修了証", zh: "结业证书", de: "Abschlusszertifikat", es: "Certificado de Finalización", ar: "شهادة إتمام", it: "Certificato di Completamento", fr: "Certificat d'achèvement"
    },
    "프로젝트 수료증": {
        ko: "프로젝트 수료증", en: "Certificate for Project Completion", ja: "プロジェクト修了証", zh: "项目结业证书", de: "Zertifikat für den Projektabschluss", es: "Certificado de Finalización del Proyecto", ar: "شهادة إتمام المشروع", it: "Certificato di Completamento del Progetto", fr: "Certificat d'achèvement du projet"
    },
    "주가 예측 모델": {
        ko: "주가 예측 모델", en: "Stock Price Prediction Model", ja: "株価予測モデル", zh: "股价预测模型", de: "Aktienkurs-Vorhersagemodell", es: "Modelo de Predicción de Precios de Acciones", ar: "نموذج التنبؤ بأسعار الأسهم", it: "Modello di Previsione dei Prezzi delle Azioni", fr: "Modèle de prévision des prix des actions"
    },
    "LSTM을 이용한 효율적인 주가 예측 모델 개발": {
        ko: "LSTM을 이용한 효율적인 주가 예측 모델 개발",
        en: "Developing an Efficient Stock Price Prediction Model Using LSTM",
        ja: "LSTMを使用した効率的な株価予測モデルの開発",
        zh: "使用LSTM开发高效的股价预测模型",
        de: "Entwicklung eines effizienten Aktienkurs-Vorhersagemodells unter Verwendung von LSTM",
        es: "Desarrollo de un modelo eficiente de predicción de precios de acciones utilizando LSTM",
        ar: "تطوير نموذج فعال للتنبؤ بأسعار الأسهم باستخدام LSTM",
        it: "Sviluppo di un modello efficiente di previsione dei prezzi delle azioni utilizzando LSTM",
        fr: "Développement d'un modèle efficace de prévision des prix des actions utilisant LSTM"
    },
    "PCCE": {
        ko: "PCCE", en: "PCCE", ja: "PCCE", zh: "PCCE", de: "PCCE", es: "PCCE", ar: "PCCE", it: "PCCE", fr: "PCCE"
    },
    "LV.2": {
        ko: "LV.2", en: "LV.2", ja: "LV.2", zh: "LV.2", de: "LV.2", es: "Nivel 2", ar: "المستوى 2", it: "Livello 2", fr: "Niveau 2"
    },
    "프로그래밍 테스트": {
        ko: "프로그래밍 테스트", en: "Programming Test", ja: "プログラミングテスト", zh: "编程测试", de: "Programmiertest", es: "Prueba de Programación", ar: "اختبار البرمجة", it: "Test di Programmazione", fr: "Test de programmation"
    },

    // Education
    "조선대학교": {
        ko: "조선대학교", en: "Chosun University", ja: "朝鮮大学校", zh: "朝鲜大学", de: "Chosun Universität", es: "Universidad de Chosun", ar: "جامعة تشوسون", it: "Università di Chosun", fr: "Université Chosun"
    },
    "AI소프트웨어학부(컴퓨터공학전공)": {
        ko: "AI소프트웨어학부(컴퓨터공학전공)",
        en: "Dept. of AI Software (Computer Engineering)",
        ja: "AIソフトウェア学部（コンピュータ工学専攻）",
        zh: "AI软件系（计算机工程专业）",
        de: "Abteilung für KI-Software (Computertechnik)",
        es: "Depto. de Software de IA (Ingeniería Informática)",
        ar: "قسم برمجيات الذكاء الاصطناعي (هندسة الكمبيوتر)",
        it: "Dip. di Software AI (Ingegneria Informatica)",
        fr: "Dép. de logiciels d'IA (Génie informatique)"
    },
    "4년": {
        ko: "4년", en: "4 years", ja: "4年", zh: "4年", de: "4 Jahre", es: "4 años", ar: "4 سنوات", it: "4 anni", fr: "4 ans"
    },

    // Experience
    "조선대학교 AI NLP 연구실": {
        ko: "조선대학교 AI NLP 연구실",
        en: "Chosun University AI NLP Lab",
        ja: "朝鮮大学校 AI NLP 研究室",
        zh: "朝鲜大学 AI NLP 实验室",
        de: "Chosun Universität AI NLP Labor",
        es: "Laboratorio de PNL e IA de la Universidad de Chosun",
        ar: "مختبر معالجة اللغات الطبيعية والذكاء الاصطناعي بجامعة تشوسون",
        it: "Laboratorio AI NLP dell'Università di Chosun",
        fr: "Laboratoire IA NLP de l'Université Chosun"
    },
    "학부 연구생": {
        ko: "학부 연구생", en: "Undergraduate Researcher", ja: "学部研究員", zh: "本科研究员", de: "Studentische Hilfskraft", es: "Investigador de Pregrado", ar: "باحث جامعي", it: "Ricercatore Universitario", fr: "Chercheur de premier cycle"
    },
    "광주": {
        ko: "광주", en: "Gwangju", ja: "光州", zh: "光州", de: "Gwangju", es: "Gwangju", ar: "غوانغجو", it: "Gwangju", fr: "Gwangju"
    },
    "광주광역시": {
        ko: "광주광역시", en: "Gwangju Metropolitan City", ja: "光州広域市", zh: "光州广域市", de: "Gwangju Metropolitan City", es: "Ciudad Metropolitana de Gwangju", ar: "مدينة غوانغجو الكبرى", it: "Città Metropolitana di Gwangju", fr: "Ville métropolitaine de Gwangju"
    },
    "유큐브": {
        ko: "유큐브", en: "Ucube", ja: "Ucube", zh: "Ucube", de: "Ucube", es: "Ucube", ar: "Ucube", it: "Ucube", fr: "Ucube"
    },
    "주니어 개발자": {
        ko: "주니어 개발자",
        en: "Junior Developer",
        ja: "ジュニア開発者",
        zh: "初级开发人员",
        de: "Junior-Entwickler",
        es: "Desarrollador Junior",
        ar: "مطور مبتدئ",
        it: "Sviluppatore Junior",
        fr: "Développeur Junior"
    },

    // Projects
    "포트폴리오 웹사이트": {
        ko: "포트폴리오 웹사이트", en: "Portfolio Website", ja: "ポートフォリオウェブサイト", zh: "作品集网站", de: "Portfolio-Website", es: "Sitio Web de Portafolio", ar: "موقع المحفظة", it: "Sito Web Portfolio", fr: "Site Web Portfolio"
    },
    "React와 TypeScript로 제작된 개인 포트폴리오 웹사이트입니다. 다국어 지원 및 반응형 디자인을 포함합니다.": {
        ko: "React와 TypeScript로 제작된 개인 포트폴리오 웹사이트입니다. 다국어 지원 및 반응형 디자인을 포함합니다.",
        en: "Personal portfolio website built with React and TypeScript. Features multi-language support and responsive design.",
        ja: "ReactとTypeScriptで構築された個人のポートフォリオウェブサイト。多言語サポートとレスポンシブデザインを特徴としています。",
        zh: "使用React和TypeScript构建的个人作品集网站。具有多语言支持和响应式设计。",
        de: "Persönliche Portfolio-Website, erstellt mit React und TypeScript. Verfügt über mehrsprachige Unterstützung und responsives Design.",
        es: "Sitio web de portafolio personal construido con React y TypeScript. Cuenta con soporte multilingüe y diseño responsivo.",
        ar: "موقع محفظة شخصي تم إنشاؤه باستخدام React و TypeScript. يتميز بدعم متعدد اللغات وتصميم متجاوب.",
        it: "Sito web portfolio personale costruito con React e TypeScript. Dispone di supporto multilingue e design reattivo.",
        fr: "Site web de portfolio personnel construit avec React et TypeScript. Dispose d'un support multilingue et d'un design réactif."
    },
    "노인 복약 모니터링 시스템": {
        ko: "노인 복약 모니터링 시스템",
        en: "Elderly Medication Monitoring System",
        ja: "高齢者服薬モニタリングシステム",
        zh: "老年人用药监控系统",
        de: "Überwachungssystem für die Medikamenteneinnahme älterer Menschen",
        es: "Sistema de Monitoreo de Medicación para Ancianos",
        ar: "نظام مراقبة أدوية كبار السن",
        it: "Sistema di Monitoraggio dei Farmaci per Anziani",
        fr: "Système de surveillance des médicaments pour les personnes âgées"
    },
    "노인들의 복약 순응도를 개선하기 위한 모바일 앱 서비스입니다.": {
        ko: "노인들의 복약 순응도를 개선하기 위한 모바일 앱 서비스입니다.",
        en: "Mobile app service to improve medication adherence for the elderly.",
        ja: "高齢者の服薬アドヒアランスを向上させるためのモバイルアプリサービス。",
        zh: "旨在提高老年人用药依从性的移动应用服务。",
        de: "Mobile App-Service zur Verbesserung der Therapietreue bei älteren Menschen.",
        es: "Servicio de aplicación móvil para mejorar la adherencia a la medicación en ancianos.",
        ar: "خدمة تطبيقات الهاتف المحمول لتحسين الالتزام بالأدوية لكبار السن.",
        it: "Servizio app mobile per migliorare l'aderenza ai farmaci per gli anziani.",
        fr: "Service d'application mobile pour améliorer l'observance thérapeutique chez les personnes âgées."
    },
    "칵테일 레시피 추천 서비스": {
        ko: "칵테일 레시피 추천 서비스",
        en: "Cocktail Recipe Recommendation Service",
        ja: "カクテルレシピ推奨サービス",
        zh: "鸡尾酒配方推荐服务",
        de: "Cocktail-Rezept-Empfehlungsservice",
        es: "Servicio de Recomendación de Recetas de Cócteles",
        ar: "خدمة التوصية بوصفات الكوكتيل",
        it: "Servizio di Raccomandazione Ricette Cocktail",
        fr: "Service de recommandation de recettes de cocktails"
    },
    "사용자 취향을 분석하여 맞춤형 칵테일 레시피를 추천하는 웹 서비스입니다.": {
        ko: "사용자 취향을 분석하여 맞춤형 칵테일 레시피를 추천하는 웹 서비스입니다.",
        en: "Web service that recommends customized cocktail recipes by analyzing user preferences.",
        ja: "ユーザーの好みを分析してカスタマイズされたカクテルレシピを推奨するウェブサービス。",
        zh: "通过分析用户偏好推荐定制鸡尾酒配方的网络服务。",
        de: "Webdienst, der durch Analyse der Benutzerpräferenzen maßgeschneiderte Cocktailrezepte empfiehlt.",
        es: "Servicio web que recomienda recetas de cócteles personalizadas analizando las preferencias del usuario.",
        ar: "خدمة ويب توصي بوصفات كوكتيل مخصصة من خلال تحليل تفضيلات المستخدم.",
        it: "Servizio web che raccomanda ricette di cocktail personalizzate analizzando le preferenze dell'utente.",
        fr: "Service Web qui recommande des recettes de cocktails personnalisées en analysant les préférences des utilisateurs."
    },

    // Skills
    "Language": { ko: "언어", en: "Language", ja: "言語", zh: "语言", de: "Sprache", es: "Idioma", ar: "لغة", it: "Lingua", fr: "Langue" },
    "언어": { ko: "언어", en: "Language", ja: "言語", zh: "语言", de: "Sprache", es: "Idioma", ar: "لغة", it: "Lingua", fr: "Langue" },
    "Frontend": { ko: "프론트엔드", en: "Frontend", ja: "フロントエンド", zh: "前端", de: "Frontend", es: "Frontend", ar: "الواجهة الأمامية", it: "Frontend", fr: "Frontend" },
    "프론트엔드": { ko: "프론트엔드", en: "Frontend", ja: "フロントエンド", zh: "前端", de: "Frontend", es: "Frontend", ar: "الواجهة الأمامية", it: "Frontend", fr: "Frontend" },
    "Backend": { ko: "백엔드", en: "Backend", ja: "バックエンド", zh: "后端", de: "Backend", es: "Backend", ar: "الواجهة الخلفية", it: "Backend", fr: "Backend" },
    "백엔드": { ko: "백엔드", en: "Backend", ja: "バックエンド", zh: "后端", de: "Backend", es: "Backend", ar: "الواجهة الخلفية", it: "Backend", fr: "Backend" },
    "DevOps": { ko: "데브옵스", en: "DevOps", ja: "DevOps", zh: "DevOps", de: "DevOps", es: "DevOps", ar: "DevOps", it: "DevOps", fr: "DevOps" },
    "데브옵스": { ko: "데브옵스", en: "DevOps", ja: "DevOps", zh: "DevOps", de: "DevOps", es: "DevOps", ar: "DevOps", it: "DevOps", fr: "DevOps" },

    // Certifications
    "백준 온라인 젓지먼트": {
        ko: "백준 온라인 젓지먼트", en: "Baekjoon Online Judge", ja: "Baekjoon Online Judge", zh: "Baekjoon Online Judge", de: "Baekjoon Online Judge", es: "Baekjoon Online Judge", ar: "Baekjoon Online Judge", it: "Baekjoon Online Judge", fr: "Baekjoon Online Judge"
    },
    "드림핵 온라인 해킹 서비스 시스템": {
        ko: "드림핵 온라인 해킹 서비스 시스템",
        en: "Dreamhack Online Hacking Service System",
        ja: "Dreamhackオンラインハッキングサービスシステム",
        zh: "Dreamhack在线黑客服务系统",
        de: "Dreamhack Online Hacking Service System",
        es: "Sistema de Servicio de Hacking en Línea Dreamhack",
        ar: "نظام خدمة القرصنة عبر الإنترنت Dreamhack",
        it: "Sistema di Servizio di Hacking Online Dreamhack",
        fr: "Système de service de piratage en ligne Dreamhack"
    },
    "조선대학교 해커로그인(KUCIS소속)": {
        ko: "조선대학교 해커로그인(KUCIS소속)",
        en: "Chosun University HackerLogin (KUCIS)",
        ja: "朝鮮大学校 HackerLogin (KUCIS)",
        zh: "朝鲜大学 HackerLogin (KUCIS)",
        de: "Chosun Universität HackerLogin (KUCIS)",
        es: "HackerLogin de la Universidad de Chosun (KUCIS)",
        ar: "جامعة تشوسون HackerLogin (KUCIS)",
        it: "HackerLogin dell'Università di Chosun (KUCIS)",
        fr: "HackerLogin de l'Université Chosun (KUCIS)"
    },
    "조선대학교소속 정보보안 동아리": {
        ko: "조선대학교소속 정보보안 동아리",
        en: "Information Security Club at Chosun University",
        ja: "朝鮮大学校の情報セキュリティサークル",
        zh: "朝鲜大学信息安全社团",
        de: "Informationssicherheitsclub an der Chosun Universität",
        es: "Club de Seguridad de la Información en la Universidad de Chosun",
        ar: "نادي أمن المعلومات في جامعة تشوسون",
        it: "Club di Sicurezza delle Informazioni all'Università di Chosun",
        fr: "Club de sécurité de l'information à l'Université Chosun"
    },
    "부원": {
        ko: "부원", en: "Member", ja: "部員", zh: "成员", de: "Mitglied", es: "Miembro", ar: "عضو", it: "Membro", fr: "Membre"
    },
    "TOPCIT": {
        ko: "TOPCIT", en: "TOPCIT", ja: "TOPCIT", zh: "TOPCIT", de: "TOPCIT", es: "TOPCIT", ar: "TOPCIT", it: "TOPCIT", fr: "TOPCIT"
    }
};

const translateText = (text) => {
    if (!text) return text;

    // Idempotency check: if already an object with 'en' or 'ko', assume it's translated
    // BUT, we want to update the translation if it's just the fallback one.
    // However, to be safe and simple, let's extract the "ko" key if it exists, or use the text itself.

    let sourceText = text;
    if (typeof text === 'object') {
        sourceText = text.ko || text.en || Object.values(text)[0];
    }

    // Normalize source text (trim)
    if (typeof sourceText === 'string') {
        sourceText = sourceText.trim();
    }

    // Lookup in dictionary
    if (dictionary[sourceText]) {
        return dictionary[sourceText];
    }

    // Fallback: return object with all languages set to sourceText
    const result = {};
    languages.forEach(lang => {
        result[lang] = sourceText;
    });
    return result;
};

const processFile = (fileName) => {
    const filePath = path.join(dataDir, `${fileName}.json`);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    let translatedData;

    if (fileName === 'skills') {
        // Skills: Array of { category: {ko:...}, items: [...] }
        // Note: The input data might already be in the localized format (from previous runs) or reverted format.
        // Our translateText handles object input by extracting 'ko'.

        translatedData = [];
        const skillsArray = Array.isArray(data) ? data : [data]; // Handle potential structure variations

        skillsArray.forEach(cat => {
            // Check if it's the new structure (with category property) or old (keys are categories)
            // Based on previous steps, it's likely the new structure: { category: ..., items: ... }
            if (cat.category) {
                translatedData.push({
                    category: translateText(cat.category),
                    items: cat.items.map(item => ({
                        ...item,
                        name: item.name // Keep name as string for now, or translate if needed? Skills usually don't need translation (e.g. Java, React)
                    }))
                });
            } else {
                // Handle old structure { "Language": [...] } just in case
                for (const [category, items] of Object.entries(cat)) {
                    translatedData.push({
                        category: translateText(category),
                        items: items.map(item => ({
                            ...item,
                            name: item.name
                        }))
                    });
                }
            }
        });
    } else if (fileName === 'education') {
        // Education: Array of objects, each containing a 'studies' array
        translatedData = data.map(group => {
            if (group.studies) {
                return {
                    ...group,
                    studies: group.studies.map(study => ({
                        ...study,
                        institute: translateText(study.institute),
                        title: translateText(study.title),
                        durationInYears: translateText(study.durationInYears)
                    }))
                };
            }
            return group;
        });
    } else {
        // Other files: Array of objects. Translate specific fields.
        translatedData = data.map(item => {
            const newItem = { ...item };
            const fieldsToTranslate = {
                'awards': ['title', 'award', 'description'],
                'experience': ['companyName', 'location'],
                'projects': ['title', 'description'],
                'certifications': ['title']
            };

            const fields = fieldsToTranslate[fileName] || [];
            fields.forEach(field => {
                if (newItem[field]) {
                    newItem[field] = translateText(newItem[field]);
                }
            });

            if (fileName === 'experience' && newItem.roles) {
                newItem.roles = newItem.roles.map(role => ({
                    ...role,
                    title: translateText(role.title),
                    location: translateText(role.location)
                }));
            }

            return newItem;
        });
    }

    fs.writeFileSync(filePath, JSON.stringify(translatedData, null, 2));
    console.log(`Translated ${fileName}.json`);
};

files.forEach(processFile);
