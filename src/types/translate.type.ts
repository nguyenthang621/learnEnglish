import { SwapSuccessResponseApi } from "./utils.type";

export interface DataTranslationVocabulary {
  original: string;
  translated: string;
  //   translated: {
  //     text: string;
  //     raw: {
  //       sentences: {
  //         trans: string;
  //         orig: string;
  //         backend: number;
  //       }[];
  //       src: string;
  //       confidence: number;
  //       spell: Record<string, never>;
  //       ld_result: {
  //         srclangs: string[];
  //         srclangs_confidences: number[];
  //         extended_srclangs: string[];
  //       };
  //     };
  //   };
}

export type TranslationsVocabularyResponse =
  SwapSuccessResponseApi<DataTranslationVocabulary>;
