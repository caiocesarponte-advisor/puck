import { Config, ComponentConfig } from "@measured/puck";
import {
  buttonCallToActionComponent,
  cardGroupComponent,
  columnLayoutComponent,
  dangerousHtmlComponent,
  dividerBlockComponent,
  featureListBlockComponent,
  frequentlyAskedQuestionsBlockComponent,
  headingBlockComponent,
  imageBlockComponent,
  pricingCardBlockComponent,
  richTextBlockComponent,
  rowLayoutComponent,
  sectionContainerComponent,
  stackGroupComponent,
  statGroupBlockComponent,
  testimonialBlockComponent
} from "../components/default-components";

export type ComponentCategory = "layout" | "content" | "advanced";

export interface ComponentRegistry {
  categories: Map<ComponentCategory, string[]>;
  components: Record<string, ComponentConfig<object>>;
}

export const createComponentRegistry = (): ComponentRegistry => ({
  categories: new Map<ComponentCategory, string[]>([
    ["layout", []],
    ["content", []],
    ["advanced", []]
  ]),
  components: {}
});

export const registerComponentCategory = (
  registry: ComponentRegistry,
  category: ComponentCategory,
  components: string[]
): ComponentRegistry => {
  registry.categories.set(category, components);
  return registry;
};

export const registerComponent = (
  registry: ComponentRegistry,
  category: ComponentCategory,
  name: string,
  component: ComponentConfig<object>
): ComponentRegistry => {
  registry.components[name] = component;
  const categoryComponents = registry.categories.get(category) ?? [];
  registry.categories.set(category, [...categoryComponents, name]);
  return registry;
};

export const buildPuckConfigFromRegistry = (registry: ComponentRegistry): Config => ({
  components: registry.components,
  categories: {
    layout: { title: "Layout", components: registry.categories.get("layout") ?? [] },
    content: { title: "Conteúdo", components: registry.categories.get("content") ?? [] },
    advanced: { title: "Avançado", components: registry.categories.get("advanced") ?? [] }
  }
});

export const getDefaultRegistry = (): ComponentRegistry => {
  const registry = createComponentRegistry();

  registerComponent(registry, "advanced", "DangerousHtml", dangerousHtmlComponent as ComponentConfig<object>);

  registerComponent(registry, "layout", "SectionContainer", sectionContainerComponent as ComponentConfig<object>);
  registerComponent(registry, "layout", "RowLayout", rowLayoutComponent as ComponentConfig<object>);
  registerComponent(registry, "layout", "ColumnLayout", columnLayoutComponent as ComponentConfig<object>);
  registerComponent(registry, "layout", "StackGroup", stackGroupComponent as ComponentConfig<object>);
  registerComponent(registry, "layout", "CardGroup", cardGroupComponent as ComponentConfig<object>);

  registerComponent(registry, "content", "HeadingBlock", headingBlockComponent as ComponentConfig<object>);
  registerComponent(registry, "content", "RichTextBlock", richTextBlockComponent as ComponentConfig<object>);
  registerComponent(registry, "content", "ImageBlock", imageBlockComponent as ComponentConfig<object>);
  registerComponent(registry, "content", "ButtonCallToAction", buttonCallToActionComponent as ComponentConfig<object>);
  registerComponent(registry, "content", "DividerBlock", dividerBlockComponent as ComponentConfig<object>);
  registerComponent(registry, "content", "FeatureListBlock", featureListBlockComponent as ComponentConfig<object>);
  registerComponent(registry, "content", "TestimonialBlock", testimonialBlockComponent as ComponentConfig<object>);
  registerComponent(registry, "content", "StatGroupBlock", statGroupBlockComponent as ComponentConfig<object>);
  registerComponent(registry, "content", "PricingCardBlock", pricingCardBlockComponent as ComponentConfig<object>);
  registerComponent(
    registry,
    "content",
    "FrequentlyAskedQuestionsBlock",
    frequentlyAskedQuestionsBlockComponent as ComponentConfig<object>
  );

  return registry;
};
