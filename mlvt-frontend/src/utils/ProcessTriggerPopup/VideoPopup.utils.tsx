import { TranslateLanguage } from '../../types/Translation'

const languageCodeMap: Record<TranslateLanguage, string> = {
    [TranslateLanguage.English]: 'en',
    [TranslateLanguage.Vietnamese]: 'vi',
    [TranslateLanguage.NoneDetected]: 'none-detected',
}

export function getLanguageCode(language: TranslateLanguage): string {
    return languageCodeMap[language] || ''
}

export function getLanguageFromCode(language: string): TranslateLanguage {
    if (language === 'en') {
        return TranslateLanguage.English
    } else if (language === 'vi') {
        return TranslateLanguage.Vietnamese
    }
    return TranslateLanguage.NoneDetected
}
