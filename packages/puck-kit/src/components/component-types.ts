export interface DangerousHtmlProps {
  html: string;
  policy: "strict" | "balanced" | "unsafe";
  allowUnsafeHtml: boolean;
}

export interface SectionContainerProps {
  paddingY: "none" | "small" | "medium" | "large";
  maxWidth: "full" | "narrow" | "wide";
  backgroundColor: string;
}

export interface RowLayoutProps {
  gap: "small" | "medium" | "large";
  align: "start" | "center" | "end";
}

export interface ColumnLayoutProps {
  width: "oneThird" | "oneHalf" | "twoThirds" | "full";
}

export interface StackGroupProps {
  gap: "small" | "medium" | "large";
}

export interface CardGroupProps {
  columns: "2" | "3" | "4";
  gap: "small" | "medium" | "large";
}

export interface HeadingBlockProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4";
}

export interface RichTextBlockProps {
  content: string;
}

export interface ImageBlockProps {
  src: string;
  alt: string;
  borderRadius: "none" | "small" | "medium";
}

export interface ButtonCallToActionProps {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface DividerBlockProps {
  spacing: "small" | "medium" | "large";
}

export interface PuckComponents {
  DangerousHtml: DangerousHtmlProps;
  SectionContainer: SectionContainerProps;
  RowLayout: RowLayoutProps;
  ColumnLayout: ColumnLayoutProps;
  StackGroup: StackGroupProps;
  CardGroup: CardGroupProps;
  HeadingBlock: HeadingBlockProps;
  RichTextBlock: RichTextBlockProps;
  ImageBlock: ImageBlockProps;
  ButtonCallToAction: ButtonCallToActionProps;
  DividerBlock: DividerBlockProps;
}
