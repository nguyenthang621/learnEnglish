// interface Definition {
//   meaning: string;
//   example?: string;
// }

interface WordDefinition {
  kind: string;
  descriptions: Definition[];
}

interface RelatedWord {
  word: string;
  pronunciation: string;
  definitions: WordDefinition[];
}

export interface DictionaryEntry2 {
  match: {
    word: string;
    pronunciation: string;
    definitions: WordDefinition[];
  };
  related?: RelatedWord[];
}

export interface Pronunciation {
  "source-text-phonetic"?: string;
  "source-text-audio"?: string;
  "destination-text-audio"?: string;
}

export type AllTranslationItem = [string, string[]];

export interface Translations {
  "all-translations"?: AllTranslationItem[];
  "possible-translations"?: string[];
  "possible-mistakes"?: string[] | null;
}

export interface Synonyms {
  [key: string]: string[] | null; // key có thể là "formal", "rare", ""...
}

export interface Definition {
  "part-of-speech"?: string;
  definition?: string;
  example?: string | null;
  "other-examples"?: string[] | null;
  synonyms?: Synonyms | null;
}

export interface TranslationResponse {
  "source-language"?: string;
  "source-text"?: string;
  "destination-language"?: string;
  "destination-text"?: string;
  pronunciation?: Pronunciation;
  translations?: Translations;
  definitions?: Definition[];
  "see-also"?: string[] | null;
}
