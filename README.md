# Puck Monorepo Profissional

Monorepo com Yarn Workspaces (v1) contendo:

- `@itarget/puck-kit`: pacote reutilizável com registry, componentes e API por interface.
- `puck-host-next`: app host Next.js (App Router) usando `Puck` e `Render` oficiais.

## 1) Como instalar

```bash
yarn install
```

## 2) Como rodar

```bash
yarn workspace puck-host-next dev
```

## 3) Como adicionar componente seguindo padrão oficial do Puck

1. Defina as props no pacote `packages/puck-kit/src/components/component-types.ts`.
2. Crie o `ComponentConfig` no arquivo `packages/puck-kit/src/components/default-components.tsx`.
3. Registre no `getDefaultRegistry()` via `registerComponent(...)`.
4. Gere `config` no host com `buildPuckConfigFromRegistry(getDefaultRegistry())`.

Padrão oficial mantido:

```tsx
import { Puck } from "@measured/puck";

<Puck config={config} data={data} onChange={setData} />
```

Render oficial:

```tsx
import { Render } from "@measured/puck";

<Render config={config} data={data} />
```

## 4) Como trocar API

O host depende da interface `PageDocumentApi`.

Implementações disponíveis:
- `MockPageDocumentApi` (memória)
- `HttpPageDocumentApi` (`fetch`)

Para trocar, substitua apenas a instância injetada no host:

```ts
const api = new HttpPageDocumentApi("https://api.exemplo.com");
```

## 5) Aviso sobre DangerousHtml

Componente `DangerousHtml` aceita políticas:
- `strict`
- `balanced`
- `unsafe`

A política `unsafe` exige `allowUnsafeHtml=true` explicitamente. Sem isso, lança erro.

## 6) Fluxo de dados: Editor → API → Render

1. Usuário edita no `Puck`.
2. `onChange` atualiza `data` no estado.
3. Ação de salvar envia documento para `PageDocumentApi`.
4. `Render` usa o mesmo `config` e `data` para saída final.

## 7) Exemplo mínimo de uso em outro projeto

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
