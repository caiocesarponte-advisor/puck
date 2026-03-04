import { MockPageDocumentApi } from "../src/api/mock-page-document-api";

describe("MockPageDocumentApi", () => {
  it("saves and retrieves documents", async () => {
    const api = new MockPageDocumentApi();

    await api.saveDocument({
      slug: "home",
      title: "Home",
      updatedAt: new Date().toISOString(),
      data: { content: [], root: { props: { title: "root" } } }
    });

    const loadedDocument = await api.getDocument("home");
    expect(loadedDocument.title).toBe("Home");

    const metadata = await api.listDocuments();
    expect(metadata).toHaveLength(1);
    expect(metadata[0].slug).toBe("home");
  });
});
