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
