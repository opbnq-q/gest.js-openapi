import { Route, Response, z, type HandlerContext } from "@gest/framework";

export const route = new Route();

route.get(
  (query) => {
    return new Response().json({
      items: [],
      filters: query,
    });
  },
  {
    query: {
      page: z.string().optional(),
      limit: z.string().optional(),
      search: z.string().optional(),
    },
  },
);

route.post(
  (ctx: HandlerContext) => {
    const body = ctx.body as
      | {
          email: string;
          name: string;
          age?: number;
          role?: "user" | "admin";
        }
      | undefined;

    if (!body) {
      return new Response().json({
        error: "Body is required",
      });
    }

    return new Response().json({
      id: "user_1",
      ...body,
    });
  },
  {
    jsonBody: z.object({
      email: z.string().email(),
      name: z.string().min(2),
      age: z.number().int().min(0).optional(),
      role: z.enum(["user", "admin"]).default("user"),
    }),
  },
);

route.put(
  (ctx: HandlerContext) => {
    const body = ctx.body as
      | {
          id: string;
          email?: string;
          name?: string;
          age?: number;
          role?: "user" | "admin";
        }
      | undefined;

    if (!body) {
      return new Response().json({
        error: "Body is required",
      });
    }

    return new Response().json({
      updated: true,
      ...body,
    });
  },
  {
    jsonBody: z.object({
      id: z.string().min(1),
      email: z.string().email().optional(),
      name: z.string().min(2).optional(),
      age: z.number().int().min(0).optional(),
      role: z.enum(["user", "admin"]).optional(),
    }),
  },
);

route.delete(
  (ctx: HandlerContext) => {
    const query = ctx.query as { id?: string };
    return new Response().json({
      deleted: true,
      id: query.id ?? "",
    });
  },
  {
    query: {
      id: z.string().min(1),
    },
  },
);
