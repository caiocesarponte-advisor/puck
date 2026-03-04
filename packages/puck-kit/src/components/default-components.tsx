import React from "react";
import { ComponentConfig } from "@measured/puck";
import {
  ButtonCallToActionProps,
  CardGroupProps,
  ColumnLayoutProps,
  DangerousHtmlProps,
  DividerBlockProps,
  HeadingBlockProps,
  ImageBlockProps,
  RichTextBlockProps,
  RowLayoutProps,
  SectionContainerProps,
  StackGroupProps
} from "./component-types";
import { sanitizeHtmlString } from "../sanitization/sanitize-html-string";

const createOptions = (values: string[]): { label: string; value: string }[] =>
  values.map((value) => ({ label: value, value }));

const spacingMap = { none: "0", small: "1rem", medium: "2rem", large: "3rem" };
const gapMap = { small: "0.75rem", medium: "1.5rem", large: "2rem" };

export const dangerousHtmlComponent: ComponentConfig<DangerousHtmlProps> = {
  label: "Dangerous HTML",
  fields: {
    html: { type: "textarea", label: "HTML" },
    policy: { type: "radio", label: "Policy", options: createOptions(["strict", "balanced", "unsafe"]) },
    allowUnsafeHtml: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true }
      ]
    }
  },
  defaultProps: { html: "<p>Edit HTML content</p>", policy: "balanced", allowUnsafeHtml: false },
  render: ({ html, policy, allowUnsafeHtml }) => {
    const sanitizedHtml = sanitizeHtmlString(html, { policy, allowUnsafeHtml });
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }
};

export const sectionContainerComponent: ComponentConfig<SectionContainerProps> = {
  label: "Section Container",
  fields: {
    paddingY: { type: "select", options: createOptions(["none", "small", "medium", "large"]) },
    maxWidth: { type: "select", options: createOptions(["full", "narrow", "wide"]) },
    backgroundColor: { type: "text" }
  },
  defaultProps: { paddingY: "medium", maxWidth: "wide", backgroundColor: "#ffffff" },
  render: ({ paddingY, maxWidth, backgroundColor, puck }) => {
    const width = maxWidth === "full" ? "100%" : maxWidth === "narrow" ? "768px" : "1200px";
    return (
      <section style={{ paddingTop: spacingMap[paddingY], paddingBottom: spacingMap[paddingY], backgroundColor }}>
        <div style={{ maxWidth: width, margin: "0 auto" }}>{puck?.renderDropZone({ zone: "children" })}</div>
      </section>
    );
  }
};

export const rowLayoutComponent: ComponentConfig<RowLayoutProps> = {
  label: "Row Layout",
  fields: {
    gap: { type: "select", options: createOptions(["small", "medium", "large"]) },
    align: { type: "select", options: createOptions(["start", "center", "end"]) }
  },
  defaultProps: { gap: "medium", align: "start" },
  render: ({ gap, align, puck }) => (
    <div style={{ display: "flex", gap: gapMap[gap], alignItems: align }}>
      {puck?.renderDropZone({ zone: "children" })}
    </div>
  )
};

export const columnLayoutComponent: ComponentConfig<ColumnLayoutProps> = {
  label: "Column Layout",
  fields: { width: { type: "select", options: createOptions(["oneThird", "oneHalf", "twoThirds", "full"]) } },
  defaultProps: { width: "oneHalf" },
  render: ({ width, puck }) => {
    const flexBasis =
      width === "oneThird" ? "33.333%" : width === "oneHalf" ? "50%" : width === "twoThirds" ? "66.666%" : "100%";
    return <div style={{ flexBasis }}>{puck?.renderDropZone({ zone: "children" })}</div>;
  }
};

export const stackGroupComponent: ComponentConfig<StackGroupProps> = {
  label: "Stack Group",
  fields: { gap: { type: "select", options: createOptions(["small", "medium", "large"]) } },
  defaultProps: { gap: "medium" },
  render: ({ gap, puck }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: gapMap[gap] }}>
      {puck?.renderDropZone({ zone: "children" })}
    </div>
  )
};

export const cardGroupComponent: ComponentConfig<CardGroupProps> = {
  label: "Card Group",
  fields: {
    columns: { type: "select", options: createOptions(["2", "3", "4"]) },
    gap: { type: "select", options: createOptions(["small", "medium", "large"]) }
  },
  defaultProps: { columns: "3", gap: "medium" },
  render: ({ columns, gap, puck }) => (
    <div style={{ display: "grid", gap: gapMap[gap], gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {puck?.renderDropZone({ zone: "children" })}
    </div>
  )
};

export const headingBlockComponent: ComponentConfig<HeadingBlockProps> = {
  label: "Heading Block",
  fields: { text: { type: "text" }, level: { type: "select", options: createOptions(["h1", "h2", "h3", "h4"]) } },
  defaultProps: { text: "New heading", level: "h2" },
  render: ({ text, level }) => React.createElement(level, undefined, text)
};

export const richTextBlockComponent: ComponentConfig<RichTextBlockProps> = {
  label: "Rich Text Block",
  fields: { content: { type: "textarea" } },
  defaultProps: { content: "Write your content..." },
  render: ({ content }) => <p>{content}</p>
};

export const imageBlockComponent: ComponentConfig<ImageBlockProps> = {
  label: "Image Block",
  fields: {
    src: { type: "text" },
    alt: { type: "text" },
    borderRadius: { type: "select", options: createOptions(["none", "small", "medium"]) }
  },
  defaultProps: { src: "https://placehold.co/1200x600", alt: "Placeholder image", borderRadius: "small" },
  render: ({ src, alt, borderRadius }) => (
    <img src={src} alt={alt} style={{ width: "100%", borderRadius: borderRadius === "none" ? "0" : borderRadius === "small" ? "0.5rem" : "0.75rem" }} />
  )
};

export const buttonCallToActionComponent: ComponentConfig<ButtonCallToActionProps> = {
  label: "Button Call To Action",
  fields: {
    label: { type: "text" },
    href: { type: "text" },
    variant: { type: "select", options: createOptions(["primary", "secondary"]) }
  },
  defaultProps: { label: "Learn more", href: "#", variant: "primary" },
  render: ({ label, href, variant }) => (
    <a href={href} style={{ display: "inline-block", padding: "0.625rem 1rem", borderRadius: "0.5rem", backgroundColor: variant === "primary" ? "#111827" : "#e5e7eb", color: variant === "primary" ? "#ffffff" : "#111827" }}>
      {label}
    </a>
  )
};

export const dividerBlockComponent: ComponentConfig<DividerBlockProps> = {
  label: "Divider Block",
  fields: { spacing: { type: "select", options: createOptions(["small", "medium", "large"]) } },
  defaultProps: { spacing: "medium" },
  render: ({ spacing }) => <hr style={{ marginTop: spacingMap[spacing], marginBottom: spacingMap[spacing] }} />
};
