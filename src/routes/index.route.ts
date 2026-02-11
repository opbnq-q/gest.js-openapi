import { Response, Route } from "@gest/framework";

export const route = new Route();

route.get(() => new Response());
