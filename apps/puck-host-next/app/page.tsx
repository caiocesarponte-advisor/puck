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
            <CardTitle>Editor e Preview com Puck oficial</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="editor">
                <Puck config={config} data={data} onChange={setData} />
              </TabsContent>
              <TabsContent value="preview">
                <Render config={config} data={data} />
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
