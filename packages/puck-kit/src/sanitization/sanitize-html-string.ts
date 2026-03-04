import DOMPurify from "dompurify";

export type SanitizationPolicy = "strict" | "balanced" | "unsafe";

export interface SanitizationOptions {
  policy?: SanitizationPolicy;
  allowUnsafeHtml?: boolean;
}

const STRICT_ALLOWED_TAGS = ["p", "strong", "em", "ul", "ol", "li", "a", "br", "span"];
const BALANCED_ALLOWED_TAGS = [
  ...STRICT_ALLOWED_TAGS,
  "h1",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "img",
  "div"
];

export const sanitizeHtmlString = (
  htmlString: string,
  options: SanitizationOptions = {}
): string => {
  const policy = options.policy ?? "balanced";

  if (policy === "unsafe") {
    if (!options.allowUnsafeHtml) {
      throw new Error("Unsafe HTML policy requires allowUnsafeHtml=true.");
    }

    return htmlString;
  }

  if (policy === "strict") {
    return DOMPurify.sanitize(htmlString, {
      ALLOWED_TAGS: STRICT_ALLOWED_TAGS,
      ALLOWED_ATTR: ["href", "target", "rel", "class"]
    });
  }

  return DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: BALANCED_ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "target", "rel", "class", "src", "alt"]
  });
};
