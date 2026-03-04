import { sanitizeHtmlString } from "../src/sanitization/sanitize-html-string";

describe("sanitizeHtmlString", () => {
  it("removes script in strict mode", () => {
    const result = sanitizeHtmlString("<p>ok</p><script>alert(1)</script>", { policy: "strict" });
    expect(result).toContain("<p>ok</p>");
    expect(result).not.toContain("script");
  });

  it("throws when unsafe mode is used without explicit allowUnsafeHtml", () => {
    expect(() => sanitizeHtmlString("<div>unsafe</div>", { policy: "unsafe" })).toThrow(
      "Unsafe HTML policy requires allowUnsafeHtml=true."
    );
  });
});
