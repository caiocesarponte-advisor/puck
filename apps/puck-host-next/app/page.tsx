"use client";

import { useMemo, useState } from "react";
import { Data, Puck, Render } from "@measured/puck";
import { buildPuckConfigFromRegistry, getDefaultRegistry, MockPageDocumentApi, PageDocument } from "@itarget/puck-kit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "@measured/puck/puck.css";

const api = new MockPageDocumentApi();

const initialData: Data = {
  content: [],
  root: {
    props: {
      title: "Página institucional"
    }
  }
};

const pagePresets: { id: string; label: string; description: string; data: Data }[] = [
  {
    id: "blank",
    label: "Página em branco",
    description: "Comece do zero com apenas o título da página.",
    data: initialData
  },
  {
    id: "institutional",
    label: "Institucional",
    description: "Hero + diferenciais + prova social.",
    data: {
      root: {
        props: {
          title: "Institucional"
        }
      },
      content: [
        { type: "SectionContainer", props: { id: "sec-hero", sectionName: "Hero", paddingY: "large", maxWidth: "wide", backgroundColor: "#f8fafc" } },
        {
          type: "SectionContainer",
          props: { id: "sec-differentials", sectionName: "Diferenciais", paddingY: "large", maxWidth: "wide", backgroundColor: "#ffffff" }
        },
        { type: "SectionContainer", props: { id: "sec-social-proof", sectionName: "Prova social", paddingY: "medium", maxWidth: "narrow", backgroundColor: "#f8fafc" } }
      ],
      zones: {
        "sec-hero:children": [{ type: "RowLayout", props: { id: "row-hero", columns: "2", gap: "large", verticalAlign: "center" } }],
        "row-hero:column-1": [{ type: "StackGroup", props: { id: "stack-hero", gap: "small" } }],
        "stack-hero:children": [
          { type: "HeadingBlock", props: { id: "hero-title", text: "Construa páginas institucionais em minutos", level: "h1", align: "left" } },
          {
            type: "RichTextBlock",
            props: { id: "hero-text", content: "Padronize comunicação, escale conteúdo e publique rápido com o editor visual.", maxWidth: "readable" }
          },
          { type: "ButtonCallToAction", props: { id: "hero-cta", label: "Solicitar demonstração", href: "#", variant: "primary", openInNewTab: false } }
        ],
        "row-hero:column-2": [
          {
            type: "ImageBlock",
            props: {
              id: "hero-image",
              src: "https://placehold.co/900x600",
              alt: "Painel institucional",
              borderRadius: "medium",
              caption: "Editor com blocos reutilizáveis"
            }
          }
        ],
        "sec-differentials:children": [{ type: "CardGroup", props: { id: "diff-cards", columns: "3", gap: "medium" } }],
        "diff-cards:children": [
          { type: "ColumnLayout", props: { id: "diff-card-1", width: "full", padding: "medium", backgroundColor: "#f8fafc" } },
          { type: "ColumnLayout", props: { id: "diff-card-2", width: "full", padding: "medium", backgroundColor: "#f8fafc" } },
          { type: "ColumnLayout", props: { id: "diff-card-3", width: "full", padding: "medium", backgroundColor: "#f8fafc" } }
        ],
        "diff-card-1:children": [
          { type: "HeadingBlock", props: { id: "diff-card-1-title", text: "Publicação rápida", level: "h3", align: "left" } },
          { type: "RichTextBlock", props: { id: "diff-card-1-text", content: "Monte páginas com componentes prontos e consistentes.", maxWidth: "normal" } }
        ],
        "diff-card-2:children": [
          { type: "HeadingBlock", props: { id: "diff-card-2-title", text: "Padronização visual", level: "h3", align: "left" } },
          { type: "RichTextBlock", props: { id: "diff-card-2-text", content: "Garanta identidade visual em todo o site.", maxWidth: "normal" } }
        ],
        "diff-card-3:children": [
          { type: "HeadingBlock", props: { id: "diff-card-3-title", text: "Escalável por times", level: "h3", align: "left" } },
          { type: "RichTextBlock", props: { id: "diff-card-3-text", content: "Marketing, produto e conteúdo colaborando no mesmo fluxo.", maxWidth: "normal" } }
        ],
        "sec-social-proof:children": [
          {
            type: "TestimonialBlock",
            props: {
              id: "testimonial-main",
              quote: "Reduzimos de dias para horas o tempo para publicar uma nova página.",
              authorName: "Time de Growth",
              authorRole: "Empresa Exemplo"
            }
          }
        ]
      }
    }
  },
  {
    id: "landing",
    label: "Landing de oferta",
    description: "Seções com proposta, recursos, preço e FAQ.",
    data: {
      root: {
        props: {
          title: "Landing de oferta"
        }
      },
      content: [
        { type: "HeadingBlock", props: { id: "landing-title", text: "Especialização intensiva para equipes de marketing", level: "h1", align: "left" } },
        {
          type: "RichTextBlock",
          props: { id: "landing-description", content: "Aprenda processos e frameworks para criar páginas de alta conversão sem depender de desenvolvimento.", maxWidth: "readable" }
        },
        { type: "FeatureListBlock", props: { id: "landing-features", title: "O que você vai dominar", description: "Conteúdo aplicado para rotina real.", features: "Arquitetura de página\nCopy orientada a conversão\nMétricas e otimização", columns: "3" } },
        { type: "PricingCardBlock", props: { id: "landing-pricing", planName: "Turma Ao Vivo", price: "R$ 1.290", periodLabel: "pagamento único", features: "20 horas de conteúdo\nMateriais práticos\nComunidade exclusiva", callToActionLabel: "Quero minha vaga", callToActionHref: "#", highlighted: true } },
        { type: "FrequentlyAskedQuestionsBlock", props: { id: "landing-faq", title: "Perguntas frequentes", items: "Para quem é?|Profissionais de marketing, produto e conteúdo\nRecebo certificado?|Sim, certificado digital ao final\nAs aulas ficam gravadas?|Sim, acesso por 12 meses" } }
      ]
    }
  }
];

const styleBlueprint = {
  visualDirection: [
    "Header com título forte + subtítulo curto orientado a valor.",
    "Blocos alternando fundos claros e neutros para separar narrativa.",
    "Cards com imagem no topo e CTA curto no rodapé.",
    "Módulos de trilha de aprendizado (ícones + microcopy objetivo).",
    "Sessões de catálogo com carrossel ou grid horizontal para reforçar repertório."
  ],
  sectionRecipes: [
    {
      name: "Hero Institucional",
      objective: "Explicar rapidamente proposta de valor e gerar primeiro clique.",
      recommendedComponents: "SectionContainer + RowLayout(2) + StackGroup + HeadingBlock + RichTextBlock + ButtonCallToAction + ImageBlock",
      copyFormula: "Promessa principal + prova de autoridade + CTA primário + CTA secundário",
      exampleCta: "Quero conhecer os cursos"
    },
    {
      name: "Diferenciais (4 pilares)",
      objective: "Mostrar por que a instituição é diferente em 10 segundos.",
      recommendedComponents: "SectionContainer + CardGroup(4) + HeadingBlock + RichTextBlock",
      copyFormula: "Título curto + 1 frase de impacto + benefício mensurável",
      exampleCta: "Navegar por especialidades"
    },
    {
      name: "Catálogo por temas",
      objective: "Organizar conteúdos por especialidade para facilitar descoberta.",
      recommendedComponents: "SectionContainer + HeadingBlock + CardGroup(4) + ImageBlock + ButtonCallToAction",
      copyFormula: "Tema + resumo do valor prático + ação direta",
      exampleCta: "Ver cursos de Hepatologia"
    },
    {
      name: "Cursos em destaque",
      objective: "Empurrar ofertas prioritárias com foco em conversão.",
      recommendedComponents: "SectionContainer + HeadingBlock + CardGroup(3) + PricingCardBlock",
      copyFormula: "Resultado esperado + público indicado + CTA de inscrição",
      exampleCta: "Garantir minha vaga"
    },
    {
      name: "Agenda de congressos e cursos",
      objective: "Ampliar percepção de ecossistema e recorrência de conteúdo.",
      recommendedComponents: "SectionContainer + RowLayout + CardGroup(5) + DividerBlock",
      copyFormula: "Evento + formato + data + status de inscrição",
      exampleCta: "Baixar edital"
    },
    {
      name: "Exploração por macrotemas",
      objective: "Criar navegação rápida por assuntos de interesse.",
      recommendedComponents: "SectionContainer + HeadingBlock + ButtonCallToAction (estilo filtro) + FeatureListBlock",
      copyFormula: "Tema principal + gatilho de relevância + acesso em 1 clique",
      exampleCta: "Explorar Cirrose"
    }
  ],
  designTokens: [
    "Escala de títulos: 40/32/24/18 para manter hierarquia clara.",
    "Espaçamento vertical padrão: 64px entre seções; 24px dentro de cards.",
    "Raio de borda: 12px em cards e 999px em botões do tipo chip.",
    "Sombras suaves em cards de conversão para destaque sem ruído.",
    "Paleta sugerida: neutro claro + verde institucional + azul técnico para imagens médicas."
  ],
  contentChecklist: [
    "Cada seção deve ter apenas 1 objetivo principal de negócio.",
    "Todo bloco precisa de CTA explícito (mesmo que secundário).",
    "Provas de autoridade: números, certificações, parcerias, docentes.",
    "Textos curtos no grid; conteúdo longo vai para páginas internas.",
    "Validar versão mobile com foco em leitura, contraste e toque."
  ]
};

export default function HomePage() {
  const config = useMemo(() => buildPuckConfigFromRegistry(getDefaultRegistry()), []);
  const [data, setData] = useState<Data>(initialData);

  const applyPreset = (presetData: Data) => {
    setData(JSON.parse(JSON.stringify(presetData)) as Data);
  };

  const handleSave = async () => {
    const pageDocument: PageDocument = {
      slug: "home",
      title: "Home",
      data,
      updatedAt: new Date().toISOString()
    };

    await api.saveDocument(pageDocument);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-6">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">SaaS Institutional Builder</h1>
        <Button onClick={handleSave}>Salvar documento</Button>
      </header>
      <Separator />

      <section className="my-4 flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Editor, Preview e Playbook de estilos</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="blueprint">Playbook</TabsTrigger>
              </TabsList>
              <TabsContent value="editor">
                <div className="mb-4 rounded-lg border bg-muted/20 p-3">
                  <p className="text-sm font-medium">Presets padrão</p>
                  <p className="mb-3 text-xs text-muted-foreground">Selecione um modelo inicial para acelerar a estrutura da página.</p>
                  <div className="flex flex-wrap gap-2">
                    {pagePresets.map((preset) => (
                      <Button key={preset.id} variant="outline" size="sm" onClick={() => applyPreset(preset.data)} title={preset.description}>
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <Puck config={config} data={data} onChange={setData} />
              </TabsContent>
              <TabsContent value="preview">
                <Render config={config} data={data} />
              </TabsContent>
              <TabsContent value="blueprint">
                <div className="space-y-6 pt-4">
                  <div>
                    <h2 className="text-xl font-semibold">Blueprint completo para páginas no estilo institucional médico</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Estrutura recomendada para transformar referência visual em páginas escaláveis dentro do Puck.
                    </p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Direção visual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc space-y-2 pl-5 text-sm">
                        {styleBlueprint.visualDirection.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Receita por seção</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {styleBlueprint.sectionRecipes.map((recipe) => (
                        <article key={recipe.name} className="rounded-lg border p-4">
                          <h3 className="font-semibold">{recipe.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{recipe.objective}</p>
                          <p className="mt-3 text-sm">
                            <strong>Componentes:</strong> {recipe.recommendedComponents}
                          </p>
                          <p className="mt-1 text-sm">
                            <strong>Fórmula de copy:</strong> {recipe.copyFormula}
                          </p>
                          <p className="mt-1 text-sm">
                            <strong>CTA exemplo:</strong> {recipe.exampleCta}
                          </p>
                        </article>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Tokens de design</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc space-y-2 pl-5 text-sm">
                          {styleBlueprint.designTokens.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Checklist de conteúdo e conversão</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc space-y-2 pl-5 text-sm">
                          {styleBlueprint.contentChecklist.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <Separator />
      <footer className="pt-4 text-sm text-muted-foreground">Powered by Next.js + Puck + Tailwind + shadcn/ui</footer>
    </main>
  );
}
