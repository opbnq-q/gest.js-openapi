import { Response, Route } from "@gest/framework";
import { openapiStore } from "./openapi.store";

export class OpenapiRoute {
  static create(): Route {
    const route = new Route();

    route.get(() => {
      const spec = openapiStore.get();

      if (!spec) {
        return new Response({
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          data: JSON.stringify({
            error: "OpenAPI document is not available",
          }),
        });
      }

      return new Response({
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: JSON.stringify(spec),
      });
    });

    return route;
  }
}
