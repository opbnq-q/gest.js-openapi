import { Response, Route } from "@gest/framework";
import { openapiStore } from "../openapi.store";

export const route = new Route();

route.get(() => {
  const spec = openapiStore.get() ?? {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
    },
    paths: {},
  };

  return new Response().json(spec);
});
