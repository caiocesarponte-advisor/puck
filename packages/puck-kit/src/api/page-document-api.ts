import { PageDocument, PageDocumentMetadata } from "../types/page-document";

export interface PageDocumentApi {
  getDocument(slug: string): Promise<PageDocument>;
  saveDocument(document: PageDocument): Promise<void>;
  listDocuments(): Promise<PageDocumentMetadata[]>;
}
