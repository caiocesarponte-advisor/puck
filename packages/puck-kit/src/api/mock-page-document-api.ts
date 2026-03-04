import { PageDocumentApi } from "./page-document-api";
import { PageDocument, PageDocumentMetadata } from "../types/page-document";

export class MockPageDocumentApi implements PageDocumentApi {
  private readonly documentsBySlug: Map<string, PageDocument>;

  public constructor(initialDocuments: PageDocument[] = []) {
    this.documentsBySlug = new Map(initialDocuments.map((document) => [document.slug, document]));
  }

  public async getDocument(slug: string): Promise<PageDocument> {
    const document = this.documentsBySlug.get(slug);

    if (!document) {
      throw new Error(`Document with slug '${slug}' was not found.`);
    }

    return document;
  }

  public async saveDocument(document: PageDocument): Promise<void> {
    this.documentsBySlug.set(document.slug, {
      ...document,
      updatedAt: new Date().toISOString()
    });
  }

  public async listDocuments(): Promise<PageDocumentMetadata[]> {
    return Array.from(this.documentsBySlug.values()).map((document) => ({
      slug: document.slug,
      title: document.title,
      updatedAt: document.updatedAt
    }));
  }
}
