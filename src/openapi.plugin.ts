import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { Route, z, type IPlugin } from "@gest/framework";
import { openapiStore } from "./openapi.store";

export class OpenapiPlugin implements IPlugin {
  name = "openapi";

  private readonly routes: Route[] = [];

  build() {
    const registry = new OpenAPIRegistry();

    this.routes.forEach((route) => {
      Object.entries(route.handlers).forEach(([method, handlerConfig]) => {
        const validationSchema = handlerConfig.validationSchema;
        const paramsSchema = this.buildParamsSchema(validationSchema?.path);
        const querySchema = this.buildParamsSchema(validationSchema?.query);
        const requestBody = validationSchema?.jsonBody
          ? {
              content: {
                "application/json": {
                  schema: validationSchema.jsonBody,
                },
              },
            }
          : undefined;

        registry.registerPath({
          method: method as any,
          path: route.path.replaceAll("[", "{").replaceAll("]", "}"),
          request: {
            params: paramsSchema,
            query: querySchema,
            body: requestBody,
          },
          responses: {
            200: {
              description: "OK",
            },
          },
        });
      });
    });

    const generator = new OpenApiGeneratorV3(registry.definitions);
    const spec = generator.generateDocument({
      openapi: "3.0.0",
      info: {
        title: "API",
        version: "1.0.0",
      },
    });

    openapiStore.set(spec as any);
  }

  private buildParamsSchema(
    source?: Record<string, z.ZodTypeAny>,
  ): z.ZodObject<any> | undefined {
    if (!source) return undefined;
    const entries = Object.entries(source);
    if (entries.length === 0) return undefined;
    return z.object(Object.fromEntries(entries)) as z.ZodObject<any>;
  }

  activate(route: Route): Promise<void> | void {
    this.routes.push(route);
    this.build();
  }
}
