import { Data } from "@measured/puck";

export interface PageDocument {
  slug: string;
  title: string;
  data: Data;
  updatedAt: string;
}

export interface PageDocumentMetadata {
  slug: string;
  title: string;
  updatedAt: string;
}
