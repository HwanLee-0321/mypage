import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export const SEOHead: React.FC = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const isKorean = currentLang === 'ko' || currentLang.startsWith('ko');

    // 한국어/영어에 따른 meta 정보
    const seoData = {
        ko: {
            title: '이재환 (Lee Jae Hwan) - 조선대학교 개발자 | Full Stack Developer Portfolio',
            description: '조선대학교 출신 풀스택 개발자. React, Node.js, TypeScript를 활용한 웹 개발 전문. 프로젝트 포트폴리오와 기술 스택을 확인하세요.',
            ogTitle: '이재환 (Lee Jae Hwan) - 조선대학교 개발자 포트폴리오',
            ogDescription: '조선대학교 출신 풀스택 개발자 이재환입니다. React, Node.js, TypeScript 전문. 프로젝트와 경력을 확인하세요.',
            twitterTitle: '이재환 (Lee Jae Hwan) - 조선대학교 개발자',
            twitterDescription: '조선대학교 출신 풀스택 개발자. React, Node.js, TypeScript 전문.',
            siteName: '이재환 개발자 포트폴리오'
        },
        en: {
            title: 'Lee Jae Hwan - Full Stack Developer | Chosun University Graduate',
            description: 'Full Stack Developer specializing in React, Node.js, and TypeScript. Chosun University graduate. Explore my projects and technical skills.',
            ogTitle: 'Lee Jae Hwan - Full Stack Developer Portfolio',
            ogDescription: 'Full Stack Developer from Chosun University. Specialized in React, Node.js, and TypeScript. Check out my projects and experience.',
            twitterTitle: 'Lee Jae Hwan - Full Stack Developer',
            twitterDescription: 'Full Stack Developer | React, Node.js, TypeScript',
            siteName: 'Lee Jae Hwan Portfolio'
        }
    };

    const seo = isKorean ? seoData.ko : seoData.en;

    return (
        <Helmet>
            {/* SEO Meta Tags */}
            <html lang={isKorean ? 'ko' : 'en'} />
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />

            {/* Open Graph */}
            <meta property="og:title" content={seo.ogTitle} />
            <meta property="og:description" content={seo.ogDescription} />
            <meta property="og:locale" content={isKorean ? 'ko_KR' : 'en_US'} />
            <meta property="og:site_name" content={seo.siteName} />

            {/* Twitter Card */}
            <meta name="twitter:title" content={seo.twitterTitle} />
            <meta name="twitter:description" content={seo.twitterDescription} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": isKorean ? "이재환" : "Lee Jae Hwan",
                    "alternateName": ["Lee Jae Hwan", "이재환", "hwanlee", "환리", "Hwan Lee", "조선대학교 이재환", "개발자 이재환"],
                    "jobTitle": isKorean ? "풀스택 개발자 (Full Stack Software Developer)" : "Full Stack Software Developer",
                    "description": isKorean
                        ? "조선대학교 출신 풀스택 소프트웨어 개발자. React, Node.js, TypeScript, Firebase 등 현대적인 웹 기술을 전문으로 합니다."
                        : "Full Stack Software Developer from Chosun University, specializing in React, Node.js, TypeScript, and Firebase.",
                    "url": "https://yourdomain.com",
                    "email": "ghksdl6026@naver.com",
                    "sameAs": [
                        "https://github.com/HwanLee-0321",
                        "https://scholar.google.com/citations?user=GnqbP2gAAAAJ",
                        "https://velog.io/@hwan_lee",
                        "https://www.linkedin.com/in/hwanlee"
                    ],
                    "alumniOf": {
                        "@type": "EducationalOrganization",
                        "name": "조선대학교",
                        "alternateName": "Chosun University"
                    }
                })}
            </script>
        </Helmet>
    );
};
