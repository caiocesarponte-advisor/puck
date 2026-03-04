export interface ComponentSchemaDescription {
  name: string;
  category: "layout" | "content" | "advanced";
  description: string;
}

export const componentSchemas: ComponentSchemaDescription[] = [
  { name: "DangerousHtml", category: "advanced", description: "Renderiza HTML com política de sanitização configurável." },
  { name: "SectionContainer", category: "layout", description: "Container de seção com largura e espaçamento." },
  { name: "RowLayout", category: "layout", description: "Layout horizontal com espaçamento e alinhamento." },
  { name: "ColumnLayout", category: "layout", description: "Coluna com largura configurável." },
  { name: "StackGroup", category: "layout", description: "Agrupamento vertical para blocos." },
  { name: "CardGroup", category: "layout", description: "Grid de cartões com número de colunas." },
  { name: "HeadingBlock", category: "content", description: "Título textual em níveis h1-h4." },
  { name: "RichTextBlock", category: "content", description: "Parágrafo simples de texto." },
  { name: "ImageBlock", category: "content", description: "Bloco de imagem responsiva." },
  { name: "ButtonCallToAction", category: "content", description: "Botão de chamada para ação." },
  { name: "DividerBlock", category: "content", description: "Separador horizontal." }
];
