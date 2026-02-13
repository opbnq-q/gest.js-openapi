import { Route, Response, z } from "@gest/framework";

export const route = new Route();

route.get(
  (query) => {
    return new Response().json({
      message: "hello world",
      query,
    });
  },
  {
    query: {
      name: z.string().nonempty(),
    },
  },
);
