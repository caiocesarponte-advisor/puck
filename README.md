# Puck Monorepo Profissional

Monorepo com Yarn Workspaces contendo:

- `@itarget/puck-kit`: pacote reutilizável com registry, componentes e API por interface.
- `puck-host-next`: app host Next.js (App Router) usando `Puck` e `Render` oficiais.

## Instalação

```bash
yarn install
```

## Execução

```bash
yarn workspace puck-host-next dev
```

## Padrão oficial do Puck (sem wrappers de core)

```tsx
import { Puck, Render } from "@measured/puck";

<Puck config={config} data={data} onChange={setData} />
<Render config={config} data={data} />
```

## Como adicionar componentes (padrão recomendado)

1. Defina as props em `packages/puck-kit/src/components/component-types.ts`.
2. Crie o `ComponentConfig` em `packages/puck-kit/src/components/default-components.tsx`.
3. Registre no `getDefaultRegistry()`.
4. Gere a configuração no host com `buildPuckConfigFromRegistry(getDefaultRegistry())`.

## API desacoplada por interface

Interface:

```ts
interface PageDocumentApi {
  getDocument(slug: string): Promise<PageDocument>;
  saveDocument(document: PageDocument): Promise<void>;
  listDocuments(): Promise<PageDocumentMetadata[]>;
}
```

Implementações:
- `MockPageDocumentApi`
- `HttpPageDocumentApi`

Troca de implementação no host (injeção):

```ts
const api = new HttpPageDocumentApi("https://api.exemplo.com");
```

## DangerousHtml (aviso)

`DangerousHtml` suporta `strict`, `balanced` e `unsafe`.

A política `unsafe` exige `allowUnsafeHtml=true`; caso contrário lança erro.

## Fluxo de dados

1. Usuário edita no `Puck`.
2. `onChange` atualiza `data`.
3. Salvamento persiste via `PageDocumentApi`.
4. `Render` exibe o mesmo `config + data`.

## Exemplo mínimo em outro projeto

```tsx
import { Puck, Render } from "@measured/puck";
import { buildPuckConfigFromRegistry, getDefaultRegistry } from "@itarget/puck-kit";

const config = buildPuckConfigFromRegistry(getDefaultRegistry());

export function EditorScreen({ data, onChange }) {
  return <Puck config={config} data={data} onChange={onChange} />;
}

export function PreviewScreen({ data }) {
  return <Render config={config} data={data} />;
}
```

## Documentação de componentes por plano (cliente final)

Consulte: `docs/componentes-por-plano.md`
