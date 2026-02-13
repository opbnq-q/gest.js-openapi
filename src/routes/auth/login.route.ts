import { Route, Response, z } from "@gest/framework";

export const route = new Route();

route.post(
  (body) => {
    if (!body) {
      return new Response().json({
        error: "Body is required",
      });
    }

    return new Response().json({
      token: "demo-token",
      user: {
        id: "user_123",
        email: body.email,
      },
    });
  },
  {
    jsonBody: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
  },
);
