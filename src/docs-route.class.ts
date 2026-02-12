import { Response, Route } from "@gest/framework";

export class DocsRoute {
  static create(): Route {
    const route = new Route();

    route.get(() => {
      const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>API Reference</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; height: 100%; }
      #scalar { height: 100%; }
    </style>
  </head>
  <body>
    <div id="scalar"></div>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
    <script>
      Scalar.createApiReference("#scalar", {
        url: "/openapi/",
      });
    </script>
  </body>
</html>`;
      return new Response({
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
        data: html,
      });
    });

    return route;
  }
}
