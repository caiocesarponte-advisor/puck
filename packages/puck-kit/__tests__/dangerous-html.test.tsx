import React from "react";
import { render, screen } from "@testing-library/react";
import { dangerousHtmlComponent } from "../src/components/default-components";

describe("DangerousHtml component", () => {
  it("renders sanitized html", () => {
    const node = dangerousHtmlComponent.render({
      html: "<p>Hello</p><script>alert(1)</script>",
      policy: "balanced",
      allowUnsafeHtml: false
    });

    render(<>{node}</>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain("script");
  });
});
