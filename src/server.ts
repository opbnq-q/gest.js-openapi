import { Server } from "@gest/framework";
import { OpenapiPlugin } from "./exports";

Server.create([new OpenapiPlugin()]).then((server) => {
  server.listen();
});
