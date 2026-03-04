import { buildPuckConfigFromRegistry, getDefaultRegistry } from "../src/registry/component-registry";

describe("component registry", () => {
  it("builds puck config with required components", () => {
    const registry = getDefaultRegistry();
    const config = buildPuckConfigFromRegistry(registry);

    expect(config.components.DangerousHtml).toBeDefined();
    expect(config.components.SectionContainer).toBeDefined();
    expect(config.categories?.layout?.components).toContain("SectionContainer");
  });
});
