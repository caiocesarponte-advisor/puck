# Catálogo de Componentes por Plano (Cliente Final)

Este guia foi criado para times de negócio, conteúdo e sucesso do cliente entenderem **o que cada componente faz**, **quando usar** e **em qual plano ele está disponível**.

## 1) Visão geral de composição (Layout)

> Regra prática: primeiro escolha a estrutura (Layout), depois preencha com Conteúdo.

### SectionContainer
- **Objetivo:** criar uma seção principal da página com largura e espaçamento.
- **Quando usar:** sempre que iniciar um novo bloco visual (hero, benefícios, FAQ, rodapé).
- **Como editar:** nome da seção, largura máxima, espaçamento vertical e cor de fundo.

### RowLayout (colunas automáticas)
- **Objetivo:** criar uma linha com 1 a 4 colunas independentes.
- **Diferença-chave:** cada coluna possui uma área própria ("Coluna 1", "Coluna 2"...), facilitando a compreensão do editor.
- **Quando usar:** comparação lado a lado, cards de benefícios, conteúdo + imagem.
- **Exemplo rápido:**
  - 1 coluna: conteúdo em largura total.
  - 2 colunas: texto à esquerda, imagem à direita.
  - 3 ou 4 colunas: mosaicos de recursos.

### ColumnLayout (coluna única)
- **Objetivo:** bloco de coluna com estilo próprio (largura, fundo e padding).
- **Quando usar:** destacar um conteúdo específico dentro de uma composição.
- **Diferença para RowLayout:**
  - `RowLayout` define múltiplas colunas da linha.
  - `ColumnLayout` estiliza uma coluna individual.

### StackGroup
- **Objetivo:** empilhar itens verticalmente com espaçamento consistente.
- **Quando usar:** títulos + textos + botão em sequência.

### CardGroup
- **Objetivo:** grid de cartões pronto para repetição de conteúdo.
- **Quando usar:** recursos, diferenciais, cases, blocos repetidos.

---

## 2) Componentes de Conteúdo por plano

## Plano Starter

### HeadingBlock
- Títulos principais e subtítulos com alinhamento.
- Use para hierarquia visual clara.

### RichTextBlock
- Texto corrido com largura ideal de leitura.
- Use para explicar proposta de valor ou contexto.

### ImageBlock
- Imagem com borda e legenda opcional.
- Use para reforço visual do texto.

### ButtonCallToAction
- CTA com variação visual e opção de abrir em nova aba.
- Use para captura de conversão (demo, orçamento, contato).

### DividerBlock
- Separador de blocos para ritmo visual.
- Use para organizar sessões longas.

## Plano Professional (extensão comercial)

### FeatureListBlock
- Lista de funcionalidades em 1, 2 ou 3 colunas.
- Excelente para páginas de produto e landing pages de oferta.

### TestimonialBlock
- Depoimento com nome e cargo.
- Prova social para reduzir fricção de compra.

### StatGroupBlock
- Métricas em destaque (valor + descrição).
- Ideal para mostrar impacto de negócio.

### CardGroup (recomendado em conjunto)
- Combinado com componentes de conteúdo, acelera a criação de grades comerciais.

## Plano Enterprise / Custom Extensions

### PricingCardBlock
- Card comercial com preço, recursos e CTA.
- Ideal para estratégias de upsell por plano.

### FrequentlyAskedQuestionsBlock
- FAQ estruturado para objeções comuns.
- Ajuda SEO e reduz tickets repetitivos.

### DangerousHtml
- Uso avançado para HTML customizado.
- **Atenção:** política `unsafe` somente quando `allowUnsafeHtml=true`.

---

## 3) Playbook de montagem recomendado

1. Criar uma `SectionContainer`.
2. Escolher estrutura com `RowLayout` ou `StackGroup`.
3. Inserir componentes de conteúdo adequados ao objetivo da seção.
4. Revisar contraste visual, hierarquia de títulos e CTAs.
5. Salvar e validar no Preview.

---

## 4) Estratégia de planos e monetização (extensões)

Sugestão comercial:

- **Starter:** presença digital institucional com blocos essenciais.
- **Professional:** foco em conversão, prova social e diferenciação.
- **Enterprise:** personalização comercial avançada, FAQ extensivo e blocos premium.

Com isso, o cliente pode evoluir de plano conforme necessidade sem migrar de plataforma.

---

## 5) Boas práticas para equipe de conteúdo

- Priorize blocos simples antes dos avançados.
- Mantenha 1 objetivo por seção (ex.: captar lead, explicar funcionalidade, validar prova social).
- Use `RowLayout` com 2 colunas para narrativas visuais (texto + imagem).
- Evite `DangerousHtml` para conteúdo rotineiro; prefira blocos nativos.
