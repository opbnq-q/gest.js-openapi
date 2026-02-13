import { Route, Response, z } from "@gest/framework";

export const route = new Route();

route.get(
  (query, params) => {
    const safeQuery = (query ?? {}) as Record<string, unknown>;
    const safeParams = (params ?? { slug: "" }) as { slug: string };

    return new Response().json({
      slug: safeParams.slug,
      page: safeQuery.page,
      limit: safeQuery.limit,
      order: safeQuery.order,
      items: [],
    });
  },
  {
    path: {
      slug: z.string().nonempty(),
    },
    query: {
      page: z
        .string()
        .regex(/^[1-9]\d*$/)
        .optional(),
      limit: z
        .string()
        .regex(/^(100|[1-9]\d?)$/)
        .optional(),
      order: z.enum(["asc", "desc"]).default("desc"),
    },
  },
);

route.post(
  (_query, params, body) => {
    const safeParams = (params ?? { slug: "" }) as { slug: string };
    const safeBody = (body ?? {}) as {
      author?: string;
      message?: string;
      parentId?: string;
    };

    return new Response().json({
      id: "cmt_123",
      slug: safeParams.slug,
      author: safeBody.author ?? "",
      message: safeBody.message ?? "",
      parentId: safeBody.parentId ?? null,
    });
  },
  {
    path: {
      slug: z.string().nonempty(),
    },
    jsonBody: z.object({
      author: z.string().min(2),
      message: z.string().min(1).max(2000),
      parentId: z.string().optional(),
    }),
  },
);
