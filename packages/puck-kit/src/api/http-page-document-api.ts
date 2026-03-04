import { PageDocumentApi } from "./page-document-api";
import { PageDocument, PageDocumentMetadata } from "../types/page-document";

export class HttpPageDocumentApi implements PageDocumentApi {
  private readonly baseUrl: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getDocument(slug: string): Promise<PageDocument> {
    const response = await fetch(`${this.baseUrl}/documents/${slug}`);

    if (!response.ok) {
      throw new Error(`Unable to load document '${slug}'.`);
    }

    return (await response.json()) as PageDocument;
  }

  public async saveDocument(document: PageDocument): Promise<void> {
    const response = await fetch(`${this.baseUrl}/documents/${document.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(document)
    });

    if (!response.ok) {
      throw new Error(`Unable to save document '${document.slug}'.`);
    }
  }

  public async listDocuments(): Promise<PageDocumentMetadata[]> {
    const response = await fetch(`${this.baseUrl}/documents`);

    if (!response.ok) {
      throw new Error("Unable to list documents.");
    }

    return (await response.json()) as PageDocumentMetadata[];
  }
}
