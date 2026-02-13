import { Route, Response, z, type HandlerContext } from "@gest/framework";

export const route = new Route();

route.get(
  (ctx: HandlerContext) => {
    const params = ctx.path as { id?: string };
    const query = ctx.query as { include?: string; verbose?: string };
    const id = params?.id ?? "unknown";
    return new Response().json({
      id,
      include: query?.include ?? "basic",
      verbose: query?.verbose ?? "false",
    });
  },
  {
    path: {
      id: z.string().nonempty(),
    },
    query: {
      include: z.enum(["basic", "profile", "settings"]).optional(),
      verbose: z.string().optional(),
    },
  },
);

route.put(
  (ctx: HandlerContext) => {
    const params = ctx.path as { id?: string };
    const body = ctx.body as
      | {
          name?: string;
          email?: string;
          age?: number;
          isActive?: boolean;
        }
      | undefined;
    const id = params?.id ?? "unknown";
    const safeBody = body ?? {};
    return new Response().json({
      id,
      updated: true,
      fields: safeBody,
    });
  },
  {
    path: {
      id: z.string().nonempty(),
    },
    jsonBody: z.object({
      name: z.string().min(2).max(100).optional(),
      email: z.string().email().optional(),
      age: z.number().int().min(0).max(130).optional(),
      isActive: z.boolean().optional(),
    }),
  },
);

route.delete(
  (ctx: HandlerContext) => {
    const params = ctx.path as { id?: string };
    const id = params?.id ?? "unknown";
    return new Response().json({
      id,
      deleted: true,
    });
  },
  {
    path: {
      id: z.string().nonempty(),
    },
  },
);
