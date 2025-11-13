import { SuccessResponseApi } from "./utils.type";

// interface Subscene {
//   name: string;
//   variants: string[];
//   thumbnail: string;
// }

export interface Scene {
  scene: string;
  variants: string[];
}

export type StructureScenesResponses = SuccessResponseApi<Scene[]>;
