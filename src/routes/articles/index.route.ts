import { Route, Response, z } from "@gest/framework";

export const route = new Route();

route.get(
  (query) => {
    const safeQuery = (query ?? {}) as Record<string, string>;
    const page = Number(safeQuery.page ?? "1");
    const pageSize = Number(safeQuery.pageSize ?? "10");
    const tag = safeQuery.tag ?? null;
    const authorId = safeQuery.authorId ?? null;

    return new Response().json({
      page,
      pageSize,
      tag,
      authorId,
      items: [
        {
          id: "art_1",
          slug: "hello-world",
          title: "Hello World",
          tags: ["intro", "general"],
        },
      ],
    });
  },
  {
    query: {
      page: z
        .string()
        .regex(/^[1-9]\d*$/)
        .optional(),
      pageSize: z
        .string()
        .regex(/^(100|[1-9]\d?)$/)
        .optional(),
      tag: z.string().min(1).optional(),
      authorId: z.string().min(1).optional(),
    },
  },
);

route.post(
  (_query, body) => {
    if (!body) {
      return new Response().json({
        error: "Body is required",
      });
    }

    return new Response().json({
      id: "art_new",
      ...body,
    });
  },
  {
    jsonBody: z.object({
      title: z.string().min(3),
      slug: z
        .string()
        .min(3)
        .regex(/^[a-z0-9-]+$/),
      content: z.string().min(10),
      tags: z.array(z.string().min(1)).default([]),
      published: z.boolean().default(false),
    }),
  },
);
