export type ComponentPlan = "starter" | "professional" | "enterprise";

export interface ComponentSchemaDescription {
  name: string;
  category: "layout" | "content" | "advanced";
  description: string;
  plan: ComponentPlan;
}

export const componentSchemas: ComponentSchemaDescription[] = [
  { name: "SectionContainer", category: "layout", description: "Seção base com largura controlada e área interna de composição.", plan: "starter" },
  { name: "RowLayout", category: "layout", description: "Linha com 1 a 4 colunas nomeadas, cada uma com sua própria drop zone.", plan: "starter" },
  { name: "ColumnLayout", category: "layout", description: "Coluna única com largura, fundo e padding customizáveis.", plan: "starter" },
  { name: "StackGroup", category: "layout", description: "Empilha componentes verticalmente com espaçamento consistente.", plan: "starter" },
  { name: "CardGroup", category: "layout", description: "Grid de cards para listagens visuais de conteúdo.", plan: "professional" },
  { name: "HeadingBlock", category: "content", description: "Título com níveis e alinhamento de texto.", plan: "starter" },
  { name: "RichTextBlock", category: "content", description: "Texto descritivo com largura de leitura otimizada.", plan: "starter" },
  { name: "ImageBlock", category: "content", description: "Imagem responsiva com legenda opcional.", plan: "starter" },
  { name: "ButtonCallToAction", category: "content", description: "Botão de conversão com estilos e controle de nova aba.", plan: "starter" },
  { name: "DividerBlock", category: "content", description: "Separador para ritmo visual da página.", plan: "starter" },
  { name: "FeatureListBlock", category: "content", description: "Lista de recursos organizada em múltiplas colunas.", plan: "professional" },
  { name: "TestimonialBlock", category: "content", description: "Depoimento com identidade de autor.", plan: "professional" },
  { name: "StatGroupBlock", category: "content", description: "Métricas de impacto para prova de resultado.", plan: "professional" },
  { name: "PricingCardBlock", category: "content", description: "Card de plano comercial para ofertas e upsell.", plan: "enterprise" },
  { name: "FrequentlyAskedQuestionsBlock", category: "content", description: "FAQ com pares de pergunta e resposta.", plan: "enterprise" },
  { name: "DangerousHtml", category: "advanced", description: "Renderiza HTML com política de sanitização configurável.", plan: "enterprise" }
];
