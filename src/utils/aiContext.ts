import awards from '../assets/static/awards.json';
// import certifications from '../assets/static/certifications.json'; // Currently unused
import education from '../assets/static/education.json';
import experience from '../assets/static/experience.json';
import projects from '../assets/static/projects.json';
import skills from '../assets/static/skills.json';

export const getPortfolioContext = (lang: string) => {
    // Helper to extract text based on language
    const getText = (item: any) => {
        if (typeof item === 'string') return item;
        if (!item) return '';
        return item[lang] || item['en'] || item['ko'] || Object.values(item)[0] || '';
    };

    // Process data to be more token-efficient and readable for the LLM
    const processedExperience = experience.map((exp: any) => ({
        company: getText(exp.companyName),
        roles: exp.roles.map((role: any) => ({
            title: getText(role.title),
            start: role.startDate,
            end: role.endDate,
            location: getText(role.location)
        }))
    }));

    const processedEducation = education.map((edu: any) => ({
        institute: getText(edu.studies[0].institute),
        major: getText(edu.studies[0].title),
        duration: getText(edu.studies[0].durationInYears)
    }));

    const processedProjects = projects.map((proj: any) => ({
        title: getText(proj.title),
        description: getText(proj.description),
        tech: proj.tech,
        date: proj.date
    }));

    const processedSkills = skills.map((skill: any) => ({
        category: getText(skill.category),
        items: skill.items.map((item: any) => item.name).join(', ')
    }));

    const processedAwards = awards.map((award: any) => ({
        title: getText(award.title),
        award: getText(award.award),
        date: award.date
    }));

    return JSON.stringify({
        profile: "Lee Jae-Hwan (Developer)",
        experience: processedExperience,
        education: processedEducation,
        projects: processedProjects,
        skills: processedSkills,
        awards: processedAwards,
        contact: "Email: ghksdl6026@naver.com"
    }, null, 2);
};
