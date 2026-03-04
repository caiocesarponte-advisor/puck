export interface DangerousHtmlProps {
  html: string;
  policy: "strict" | "balanced" | "unsafe";
  allowUnsafeHtml: boolean;
}

export interface SectionContainerProps {
  sectionName: string;
  paddingY: "none" | "small" | "medium" | "large";
  maxWidth: "full" | "narrow" | "wide";
  backgroundColor: string;
}

export interface RowLayoutProps {
  columns: "1" | "2" | "3" | "4";
  gap: "small" | "medium" | "large";
  verticalAlign: "start" | "center" | "end";
}

export interface ColumnLayoutProps {
  width: "oneThird" | "oneHalf" | "twoThirds" | "full";
  padding: "none" | "small" | "medium";
  backgroundColor: string;
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
  align: "left" | "center" | "right";
}

export interface RichTextBlockProps {
  content: string;
  maxWidth: "normal" | "readable";
}

export interface ImageBlockProps {
  src: string;
  alt: string;
  borderRadius: "none" | "small" | "medium";
  caption: string;
}

export interface ButtonCallToActionProps {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  openInNewTab: boolean;
}

export interface DividerBlockProps {
  spacing: "small" | "medium" | "large";
}

export interface FeatureListBlockProps {
  title: string;
  description: string;
  features: string;
  columns: "1" | "2" | "3";
}

export interface TestimonialBlockProps {
  quote: string;
  authorName: string;
  authorRole: string;
}

export interface StatGroupBlockProps {
  title: string;
  items: string;
}

export interface PricingCardBlockProps {
  planName: string;
  price: string;
  periodLabel: string;
  features: string;
  callToActionLabel: string;
  callToActionHref: string;
  highlighted: boolean;
}

export interface FrequentlyAskedQuestionsBlockProps {
  title: string;
  items: string;
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
  FeatureListBlock: FeatureListBlockProps;
  TestimonialBlock: TestimonialBlockProps;
  StatGroupBlock: StatGroupBlockProps;
  PricingCardBlock: PricingCardBlockProps;
  FrequentlyAskedQuestionsBlock: FrequentlyAskedQuestionsBlockProps;
}
