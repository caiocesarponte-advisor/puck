import React from "react";
import { ComponentConfig } from "@measured/puck";
import {
  ButtonCallToActionProps,
  CardGroupProps,
  ColumnLayoutProps,
  DangerousHtmlProps,
  DividerBlockProps,
  FeatureListBlockProps,
  FrequentlyAskedQuestionsBlockProps,
  HeadingBlockProps,
  ImageBlockProps,
  PricingCardBlockProps,
  RichTextBlockProps,
  RowLayoutProps,
  SectionContainerProps,
  StackGroupProps,
  StatGroupBlockProps,
  TestimonialBlockProps
} from "./component-types";
import { sanitizeHtmlString } from "../sanitization/sanitize-html-string";

const createOptions = (values: string[]): { label: string; value: string }[] =>
  values.map((value) => ({ label: value, value }));

const spacingMap = { none: "0", small: "1rem", medium: "2rem", large: "3rem" };
const gapMap = { small: "0.75rem", medium: "1.5rem", large: "2rem" };
const columnWidthMap = { oneThird: "33.333%", oneHalf: "50%", twoThirds: "66.666%", full: "100%" };

const splitTextLines = (value: string): string[] =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

export const dangerousHtmlComponent: ComponentConfig<DangerousHtmlProps> = {
  label: "Dangerous HTML",
  fields: {
    html: { type: "textarea", label: "HTML" },
    policy: { type: "radio", label: "Política", options: createOptions(["strict", "balanced", "unsafe"]) },
    allowUnsafeHtml: {
      type: "radio",
      label: "Permitir HTML não sanitizado",
      options: [
        { label: "Não", value: false },
        { label: "Sim", value: true }
      ]
    }
  },
  defaultProps: { html: "<p>Edite o conteúdo HTML</p>", policy: "balanced", allowUnsafeHtml: false },
  render: ({ html, policy, allowUnsafeHtml }) => {
    const sanitizedHtml = sanitizeHtmlString(html, { policy, allowUnsafeHtml });
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }
};

export const sectionContainerComponent: ComponentConfig<SectionContainerProps> = {
  label: "Layout · Section Container",
  fields: {
    sectionName: { type: "text", label: "Nome da seção" },
    paddingY: { type: "select", label: "Espaçamento vertical", options: createOptions(["none", "small", "medium", "large"]) },
    maxWidth: { type: "select", label: "Largura máxima", options: createOptions(["full", "narrow", "wide"]) },
    backgroundColor: { type: "text", label: "Cor de fundo" }
  },
  defaultProps: { sectionName: "Nova seção", paddingY: "medium", maxWidth: "wide", backgroundColor: "#ffffff" },
  render: ({ sectionName, paddingY, maxWidth, backgroundColor, puck }) => {
    const width = maxWidth === "full" ? "100%" : maxWidth === "narrow" ? "768px" : "1200px";

    return (
      <section style={{ paddingTop: spacingMap[paddingY], paddingBottom: spacingMap[paddingY], backgroundColor }}>
        <div style={{ maxWidth: width, margin: "0 auto" }}>
          <div style={{ marginBottom: "0.5rem", fontSize: "0.75rem", color: "#6b7280" }}>{sectionName}</div>
          {puck?.renderDropZone({ zone: "children" })}
        </div>
      </section>
    );
  }
};

export const rowLayoutComponent: ComponentConfig<RowLayoutProps> = {
  label: "Layout · Row Layout (colunas automáticas)",
  fields: {
    columns: { type: "select", label: "Quantidade de colunas", options: createOptions(["1", "2", "3", "4"]) },
    gap: { type: "select", label: "Espaçamento entre colunas", options: createOptions(["small", "medium", "large"]) },
    verticalAlign: { type: "select", label: "Alinhamento vertical", options: createOptions(["start", "center", "end"]) }
  },
  defaultProps: { columns: "2", gap: "medium", verticalAlign: "start" },
  render: ({ columns, gap, verticalAlign, puck }) => {
    const columnCount = Number(columns);

    return (
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, gap: gapMap[gap], alignItems: verticalAlign }}>
        {Array.from({ length: columnCount }).map((_, index) => {
          const zoneName = `column-${index + 1}`;
          return (
            <div key={zoneName} style={{ border: "1px dashed #cbd5e1", borderRadius: "0.5rem", padding: "0.75rem" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>Coluna {index + 1}</div>
              {puck?.renderDropZone({ zone: zoneName })}
            </div>
          );
        })}
      </div>
    );
  }
};

export const columnLayoutComponent: ComponentConfig<ColumnLayoutProps> = {
  label: "Layout · Column Layout (coluna única)",
  fields: {
    width: { type: "select", label: "Largura da coluna", options: createOptions(["oneThird", "oneHalf", "twoThirds", "full"]) },
    padding: { type: "select", label: "Padding interno", options: createOptions(["none", "small", "medium"]) },
    backgroundColor: { type: "text", label: "Cor de fundo" }
  },
  defaultProps: { width: "full", padding: "small", backgroundColor: "#f8fafc" },
  render: ({ width, padding, backgroundColor, puck }) => (
    <div style={{ width: columnWidthMap[width], backgroundColor, padding: spacingMap[padding], borderRadius: "0.5rem" }}>
      {puck?.renderDropZone({ zone: "children" })}
    </div>
  )
};

export const stackGroupComponent: ComponentConfig<StackGroupProps> = {
  label: "Layout · Stack Group (vertical)",
  fields: { gap: { type: "select", label: "Espaçamento vertical", options: createOptions(["small", "medium", "large"]) } },
  defaultProps: { gap: "medium" },
  render: ({ gap, puck }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: gapMap[gap] }}>{puck?.renderDropZone({ zone: "children" })}</div>
  )
};

export const cardGroupComponent: ComponentConfig<CardGroupProps> = {
  label: "Layout · Card Group (grid de cards)",
  fields: {
    columns: { type: "select", label: "Colunas", options: createOptions(["2", "3", "4"]) },
    gap: { type: "select", label: "Espaçamento", options: createOptions(["small", "medium", "large"]) }
  },
  defaultProps: { columns: "3", gap: "medium" },
  render: ({ columns, gap, puck }) => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: gapMap[gap] }}>
      {puck?.renderDropZone({ zone: "children" })}
    </div>
  )
};

export const headingBlockComponent: ComponentConfig<HeadingBlockProps> = {
  label: "Conteúdo · Heading Block",
  fields: {
    text: { type: "text", label: "Título" },
    level: { type: "select", label: "Nível", options: createOptions(["h1", "h2", "h3", "h4"]) },
    align: { type: "select", label: "Alinhamento", options: createOptions(["left", "center", "right"]) }
  },
  defaultProps: { text: "Novo título", level: "h2", align: "left" },
  render: ({ text, level, align }) => React.createElement(level, { style: { textAlign: align } }, text)
};

export const richTextBlockComponent: ComponentConfig<RichTextBlockProps> = {
  label: "Conteúdo · Rich Text Block",
  fields: {
    content: { type: "textarea", label: "Conteúdo" },
    maxWidth: { type: "select", label: "Largura de leitura", options: createOptions(["normal", "readable"]) }
  },
  defaultProps: { content: "Descreva sua proposta de valor aqui.", maxWidth: "readable" },
  render: ({ content, maxWidth }) => <p style={{ maxWidth: maxWidth === "readable" ? "75ch" : "100%", lineHeight: 1.6 }}>{content}</p>
};

export const imageBlockComponent: ComponentConfig<ImageBlockProps> = {
  label: "Conteúdo · Image Block",
  fields: {
    src: { type: "text", label: "URL da imagem" },
    alt: { type: "text", label: "Texto alternativo" },
    borderRadius: { type: "select", label: "Borda", options: createOptions(["none", "small", "medium"]) },
    caption: { type: "text", label: "Legenda" }
  },
  defaultProps: { src: "https://placehold.co/1200x600", alt: "Imagem de capa", borderRadius: "small", caption: "" },
  render: ({ src, alt, borderRadius, caption }) => (
    <figure>
      <img src={src} alt={alt} style={{ width: "100%", borderRadius: borderRadius === "none" ? "0" : borderRadius === "small" ? "0.5rem" : "0.75rem" }} />
      {caption ? <figcaption style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>{caption}</figcaption> : null}
    </figure>
  )
};

export const buttonCallToActionComponent: ComponentConfig<ButtonCallToActionProps> = {
  label: "Conteúdo · Button Call To Action",
  fields: {
    label: { type: "text", label: "Texto do botão" },
    href: { type: "text", label: "Link" },
    variant: { type: "select", label: "Variante", options: createOptions(["primary", "secondary"]) },
    openInNewTab: { type: "radio", label: "Abrir em nova aba", options: [{ label: "Não", value: false }, { label: "Sim", value: true }] }
  },
  defaultProps: { label: "Saiba mais", href: "#", variant: "primary", openInNewTab: false },
  render: ({ label, href, variant, openInNewTab }) => (
    <a
      href={href}
      target={openInNewTab ? "_blank" : "_self"}
      rel={openInNewTab ? "noreferrer" : undefined}
      style={{
        display: "inline-block",
        padding: "0.625rem 1rem",
        borderRadius: "0.5rem",
        backgroundColor: variant === "primary" ? "#111827" : "#e5e7eb",
        color: variant === "primary" ? "#ffffff" : "#111827"
      }}
    >
      {label}
    </a>
  )
};

export const dividerBlockComponent: ComponentConfig<DividerBlockProps> = {
  label: "Conteúdo · Divider Block",
  fields: { spacing: { type: "select", label: "Espaçamento", options: createOptions(["small", "medium", "large"]) } },
  defaultProps: { spacing: "medium" },
  render: ({ spacing }) => <hr style={{ marginTop: spacingMap[spacing], marginBottom: spacingMap[spacing] }} />
};

export const featureListBlockComponent: ComponentConfig<FeatureListBlockProps> = {
  label: "Conteúdo · Feature List Block",
  fields: {
    title: { type: "text", label: "Título" },
    description: { type: "textarea", label: "Descrição" },
    features: { type: "textarea", label: "Recursos (1 por linha)" },
    columns: { type: "select", label: "Colunas", options: createOptions(["1", "2", "3"]) }
  },
  defaultProps: {
    title: "Principais recursos",
    description: "Destaque funcionalidades que geram resultado.",
    features: "Editor visual\nRenderização oficial\nVersionamento de conteúdo",
    columns: "2"
  },
  render: ({ title, description, features, columns }) => {
    const featureItems = splitTextLines(features);
    return (
      <section>
        <h3>{title}</h3>
        <p style={{ color: "#4b5563" }}>{description}</p>
        <ul style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: "0.75rem", paddingLeft: "1rem" }}>
          {featureItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    );
  }
};

export const testimonialBlockComponent: ComponentConfig<TestimonialBlockProps> = {
  label: "Conteúdo · Testimonial Block",
  fields: {
    quote: { type: "textarea", label: "Depoimento" },
    authorName: { type: "text", label: "Nome" },
    authorRole: { type: "text", label: "Cargo / Empresa" }
  },
  defaultProps: {
    quote: "A equipe conseguiu publicar páginas muito mais rápido e com consistência visual.",
    authorName: "Cliente Exemplo",
    authorRole: "Head de Marketing"
  },
  render: ({ quote, authorName, authorRole }) => (
    <blockquote style={{ borderLeft: "4px solid #e5e7eb", paddingLeft: "1rem" }}>
      <p style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>“{quote}”</p>
      <footer style={{ color: "#6b7280" }}>{authorName} · {authorRole}</footer>
    </blockquote>
  )
};

export const statGroupBlockComponent: ComponentConfig<StatGroupBlockProps> = {
  label: "Conteúdo · Stat Group Block",
  fields: {
    title: { type: "text", label: "Título" },
    items: { type: "textarea", label: "Métricas (formato: Valor|Descrição, 1 por linha)" }
  },
  defaultProps: {
    title: "Resultados",
    items: "+42%|Conversão\n3x|Velocidade de publicação\n99,9%|Disponibilidade"
  },
  render: ({ title, items }) => {
    const metricLines = splitTextLines(items).map((line) => {
      const [value, description] = line.split("|");
      return {
        value: value?.trim() ?? "",
        description: description?.trim() ?? ""
      };
    });

    return (
      <section>
        <h3>{title}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem" }}>
          {metricLines.map((metric) => (
            <div key={`${metric.value}-${metric.description}`} style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{metric.value}</div>
              <div style={{ color: "#6b7280" }}>{metric.description}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
};

export const pricingCardBlockComponent: ComponentConfig<PricingCardBlockProps> = {
  label: "Conteúdo · Pricing Card Block",
  fields: {
    planName: { type: "text", label: "Nome do plano" },
    price: { type: "text", label: "Preço" },
    periodLabel: { type: "text", label: "Período" },
    features: { type: "textarea", label: "Itens (1 por linha)" },
    callToActionLabel: { type: "text", label: "Texto do botão" },
    callToActionHref: { type: "text", label: "Link do botão" },
    highlighted: { type: "radio", label: "Plano em destaque", options: [{ label: "Não", value: false }, { label: "Sim", value: true }] }
  },
  defaultProps: {
    planName: "Professional",
    price: "R$ 499",
    periodLabel: "/mês",
    features: "Editor visual\nAPI dedicada\nSuporte prioritário",
    callToActionLabel: "Contratar",
    callToActionHref: "#",
    highlighted: true
  },
  render: ({ planName, price, periodLabel, features, callToActionLabel, callToActionHref, highlighted }) => (
    <article style={{ border: highlighted ? "2px solid #111827" : "1px solid #e5e7eb", borderRadius: "1rem", padding: "1rem" }}>
      <h3>{planName}</h3>
      <p style={{ fontSize: "2rem", fontWeight: 700 }}>
        {price}
        <span style={{ fontSize: "1rem", color: "#6b7280", fontWeight: 400 }}>{periodLabel}</span>
      </p>
      <ul style={{ paddingLeft: "1rem" }}>
        {splitTextLines(features).map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <a href={callToActionHref} style={{ display: "inline-block", marginTop: "1rem", background: "#111827", color: "#fff", borderRadius: "0.5rem", padding: "0.5rem 0.875rem" }}>
        {callToActionLabel}
      </a>
    </article>
  )
};

export const frequentlyAskedQuestionsBlockComponent: ComponentConfig<FrequentlyAskedQuestionsBlockProps> = {
  label: "Conteúdo · FAQ Block",
  fields: {
    title: { type: "text", label: "Título" },
    items: { type: "textarea", label: "Perguntas (formato: Pergunta?|Resposta, 1 por linha)" }
  },
  defaultProps: {
    title: "Perguntas frequentes",
    items: "Posso integrar com API própria?|Sim, usando PageDocumentApi.\nPosso liberar extensões por cliente?|Sim, por plano e feature flag."
  },
  render: ({ title, items }) => (
    <section>
      <h3>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {splitTextLines(items).map((line) => {
          const [question, answer] = line.split("|");
          return (
            <div key={line} style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "0.75rem" }}>
              <p style={{ fontWeight: 600 }}>{question}</p>
              <p style={{ color: "#6b7280", marginTop: "0.25rem" }}>{answer}</p>
            </div>
          );
        })}
      </div>
    </section>
  )
};
