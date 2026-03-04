export {
  createComponentRegistry,
  registerComponentCategory,
  registerComponent,
  buildPuckConfigFromRegistry,
  getDefaultRegistry
} from "./registry/component-registry";

export type { PageDocumentApi } from "./api/page-document-api";
export { MockPageDocumentApi } from "./api/mock-page-document-api";
export { HttpPageDocumentApi } from "./api/http-page-document-api";

export { sanitizeHtmlString } from "./sanitization/sanitize-html-string";
export type { SanitizationOptions, SanitizationPolicy } from "./sanitization/sanitize-html-string";

export type { PuckComponents } from "./components/component-types";
export type { PageDocument, PageDocumentMetadata } from "./types/page-document";
export { componentSchemas } from "./types/component-schemas";
