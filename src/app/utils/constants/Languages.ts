export interface SupportedLanguage {
  lang: string;
  code: string;
  flag: string;
}

export const supportedLanguages: SupportedLanguage[] = [
  { lang: 'Español', code: 'es', flag: 'es' },
  { lang: 'Français', code: 'fr', flag: 'fr' },
  { lang: 'Kreyòl', code: 'ht', flag: 'ht' },
  { lang: 'English', code: 'en', flag: 'us' },
];
