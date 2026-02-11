type OpenApiSpec = Record<string, unknown>;

class OpenapiStore {
  private spec: OpenApiSpec | null = null;

  set(spec: OpenApiSpec) {
    this.spec = spec;
  }

  get(): OpenApiSpec | null {
    return this.spec;
  }

  clear() {
    this.spec = null;
  }

  has(): boolean {
    return this.spec !== null;
  }
}

export const openapiStore = new OpenapiStore();
export type { OpenApiSpec };
