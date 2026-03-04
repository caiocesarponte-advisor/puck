import { buildPuckConfigFromRegistry, getDefaultRegistry } from "../src/registry/component-registry";

describe("component registry", () => {
  it("builds puck config with required layout and content components", () => {
    const registry = getDefaultRegistry();
    const config = buildPuckConfigFromRegistry(registry);

    expect(config.components.DangerousHtml).toBeDefined();
    expect(config.components.RowLayout).toBeDefined();
    expect(config.components.FeatureListBlock).toBeDefined();
    expect(config.components.PricingCardBlock).toBeDefined();

    expect(config.categories?.layout?.components).toContain("RowLayout");
    expect(config.categories?.content?.components).toContain("FeatureListBlock");
  });
});
