export const getLocalizedText = (data: any, lang: string): string => {
    if (!data) return '';
    if (typeof data === 'string') return data; // Fallback for old string data

    // Try to get the requested language, fallback to English, then Korean, then the first available key
    return data[lang] || data['en'] || data['ko'] || Object.values(data)[0] || '';
};
